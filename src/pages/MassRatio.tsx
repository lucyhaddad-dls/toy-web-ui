import { useState, useContext } from "react";
import { type NewSampleMassRatioType } from "../models/models";
import { defaultFormulaInfoValues } from "../models/defaults";
import { SampleContext } from "../context/DataContext";
import { Button, Fab, Grid, Stack } from "@mui/material";
import { MassRatioInput } from "../components/MassRatioInput";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { getNewFormula } from "../models/queryFunctions";

export function MassRatioPage () {

    const [inputCount, setInputCount] = useState<number>(1)

    const { values, setValues } = useContext(SampleContext)
    const [formulaInfo, setFormulaInfo] = useState<NewSampleMassRatioType[]>(defaultFormulaInfoValues)

    let initial = "";
    if (values.filter(v => v.name=="formula")[0].value.val != null){
        initial = values.filter(v => v.name=="formula")[0].value.val as string;
    }
    const formula = initial
    initial = "stop"

    if (formula != "" && initial != "stop"){
        const newInfo = [...formulaInfo]
        newInfo[0]["formula"] = formula
        setFormulaInfo(newInfo) }

    const onChange = (index:number, valname:"formula"|"ratio",
            value:string|number) => {

        const data = [...formulaInfo]

        if (valname == "formula")
            {data[index][valname] = value as string}
        if (valname == "ratio")
            {data[index][valname] = value as number}

        setFormulaInfo(data)  }

    const onAdd = () => {
        setFormulaInfo([...formulaInfo, {formula:"", ratio:1}])
    }

    const onDelete = (index:number) => {
        const data = [...formulaInfo]
        data.splice(index, 1);
        setFormulaInfo(data)
    }

    const onCalculate = ()=> {
        const formulaList = formulaInfo.map(i => i.formula)
        const ratioList = formulaInfo.map(i => i.ratio)

        getNewFormula(formulaList, ratioList).then(
            data => {
                if (data != ""){
                    const newValues = values.map(itm => {
                        if (itm.name == "formula"){
                            return {...itm, value: {...itm.value, val:data}}
                        }
                        else {return itm}
                    });
                    setValues(newValues) }
            }
        );
        return () => {} }

    return (
        <Stack spacing={2} sx={{width:"100vw"}}>
            Final Formula: 
        <Grid container  sx={{justifyContent:"space-between"}}>
            <Grid sx={{bgcolor:"#fefefefe"}}>
            {values.filter(v =>v.name == "formula")[0].value.val}
            </Grid>
            <Grid>
             <Button variant="contained"
             
            onClick={() => onCalculate()}>
                Calculate?
            </Button>
            </Grid>
        </Grid>
        <Grid container
        rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        {formulaInfo.map((_elm, index) => {
            if (index == inputCount - 1){

                return (<Grid key={index}
                rowSpacing={1} columnSpacing={1}>

                <MassRatioInput componentIndex={index} 
                        defaults={formulaInfo[index]}
                                onChange={onChange}/>
            <Fab
                color="primary"
                size="small"
                variant="circular"
                onClick={() => {setInputCount(inputCount+1)
                    onAdd() } 
                        }>
                <AddIcon/>
            </Fab>
            <Fab
            color="primary"
            size="small"
            variant="circular"
            onClick={() => {if (inputCount > 1){
                setInputCount(inputCount-1);
                onDelete(index)
            }}}>
                <DeleteOutlinedIcon/>
            </Fab>
                </Grid> ) }
        if (index != inputCount){
            return (
                <Grid key={index}>
                    <MassRatioInput componentIndex={index}
                            defaults={formulaInfo[index]}
                                    onChange={onChange}/>
                </Grid> )  }

        })}

        </Grid>
        </Stack>
    )

    
}