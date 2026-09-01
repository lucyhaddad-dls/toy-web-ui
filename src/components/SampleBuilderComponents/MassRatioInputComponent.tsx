import { Fab, Grid, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { NumberInput } from "@diamondlightsource/sci-react-ui";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import type { SampleMassRatioType } from "../../models/models";


function MassRatioInputComponent (props:{componentNumber:number,
                                sampleInfo:SampleMassRatioType[],
                                onChange:(index: number, valuetype: "formula" | "ratio", value: string | number) => void
}
                             ) {
    const [formula, setFormula] = useState<string>(props.sampleInfo[props.componentNumber].formula)
    const [ratio, setRatio] = useState<number>(props.sampleInfo[props.componentNumber].ratio)


    const UpdateInfo = (valuetype:"formula"|"ratio", value:string|number) => {
        props.onChange(props.componentNumber, valuetype, value)
    }

    return (
        <Stack spacing={2}>
            <TextField
            label={`Formula for component ${props.componentNumber}`}
            onKeyUp={(event) => {
                if (event.key == "Enter"){
                    const val = event.target as HTMLTextAreaElement
                    setFormula(val.value);
                    UpdateInfo("formula", val.value)
                   
                    event.preventDefault() } 
                } }>
                {formula}
            </TextField>
            <NumberInput
            label={`Mass Ratio for component
             #${props.componentNumber}`}
             defaultValue={ratio}
             minValue={0}
             maxValue={1}
             numberMode="floating"
             commitOnReturn={true}
             onCommit={(number) => {setRatio(number); 
                UpdateInfo("ratio", number)
                }}
            />
        </Stack>
    )
}

export function MassRatioInputFields () {
    
    const [inputCount, setInputCount] = useState<number>(1)

    const [formulaInfo, setFormulaInfo] = useState<SampleMassRatioType[]>([{index:0, formula:"", ratio:1}])

    const onAdd = () => {
        setFormulaInfo([...formulaInfo, {index:inputCount, formula:"", ratio:1}] );
    };

    const onDelete = (index:number) => {
        const data = [...formulaInfo];
        data.splice(index, 1);
        setFormulaInfo(data)
    }

    const onCalculate = () => {
        const formulaList = formulaInfo.map(i => i.formula)
        const ratioList = formulaInfo.map(i => i.ratio)
        console.log("formula list: ", formulaList, "\nratio list: ", ratioList)
    }

    // make an onChange fn. here instead
    const onChange = (index:number, valuetype:"formula"|"ratio", value:string|number) => {

        const data = [...formulaInfo]
        data[index][valuetype] = value
        setFormulaInfo(data)

     }

    return (
        <Stack spacing={2}>
        <Grid>
            Final Formula: 
            <Button variant="contained"
            onClick={() => onCalculate() }>Calculate?</Button>
        </Grid>
        <Grid container
         rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {

        formulaInfo.map((_elm, index) => { 
            if (index == inputCount-1){
            return ( <Grid key={index} rowSpacing={1}
            columnSpacing={1}>

            <MassRatioInputComponent componentNumber={index}
                                    sampleInfo={formulaInfo}
                                    setSampleInfo={setFormulaInfo}
                                    onChange={onChange} />

             <Fab
                color="primary"
                size="small"
                variant="circular"
                onClick={() => {setInputCount(inputCount+1)
                    onAdd() } } >
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
        </Grid>)
        
        }
        if (index !== inputCount){

            return ( <Grid key={index}>
            <MassRatioInputComponent componentNumber={index}
                                        sampleInfo={formulaInfo} 
                                        setSampleInfo={setFormulaInfo}
                                        onChange={onChange}
                                        />
           
        </Grid>)
        
        }
    }
        )}

    </Grid>

    </Stack>
    )
}