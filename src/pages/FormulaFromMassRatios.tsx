import { useState, useContext } from "react";
import { type NewSampleMassRatioType } from "../models/models";
import { defaultFormulaInfoValues } from "../models/defaults";
import { SampleContext } from "../context/DataContext";
import { Button, Fab, Grid, Stack } from "@mui/material";
import { MassRatioInput } from "../components/MassRatioInput";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export function MassRatioPage () {

    const [inputCount, setInputCount] = useState<number>(1)

    const { formula } = useContext(SampleContext) // add setFormula later.

    const [formulaInfo, setFormulaInfo] = useState<NewSampleMassRatioType[]>(defaultFormulaInfoValues)

    if (formula != ""){
        const newInfo = [...formulaInfo]
        newInfo[0]["formula"] = formula
        setFormulaInfo(newInfo) }

    const onChange = (index:number, valname:"formula"|"ratio",
            value:string|number) => {

        const data = [...formulaInfo]

        if (valname == "formula"){
            data[index][valname] = value as string
        }
        if (valname == "ratio"){
            data[index][valname] = value as number
        }

        setFormulaInfo(data)
            }

    const onAdd = () => {
        setFormulaInfo([...formulaInfo, {formula:"", ratio:1}])
    }

    const onDelete = (index:number) => {
        const data = [...formulaInfo]
        data.splice(index, 1);
        setFormulaInfo(data)
    }

    const onCalculate = () => {
        const formulaList = formulaInfo.map(i => i.formula)
        const ratioList = formulaInfo.map(i => i.ratio)

        console.log("formula list: ", formulaList, 
            "\nratio list: ", ratioList)
    }

    return (
        <Stack spacing={2}>
        <Grid>
            Final Formula:
            <Button variant="contained" onClick={onCalculate}>
                Calculate?
            </Button>
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