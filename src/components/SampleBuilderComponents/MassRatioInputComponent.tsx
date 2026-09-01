import { Fab, Grid, Stack, TextField } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import AddIcon from '@mui/icons-material/Add';
import { NumberInput } from "@diamondlightsource/sci-react-ui";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import type { SampleMassRatioType } from "../../models/models";


function MassRatioInputComponent (props:{componentNumber:number,
                                sampleInfo:SampleMassRatioType[],
                                setSampleInfo: Dispatch<SetStateAction<SampleMassRatioType[]>>
}
                             ) {
    const [formula, setFormula] = useState<string>("")
    const [ratio, setRatio] = useState<number>(1)

    
    const updateSampleInfo = () => {

    const indx = props.sampleInfo.findIndex(v => v.index == props.componentNumber)
    console.log("index: ", indx)
    const newSampleInfo = [...props.sampleInfo]
    newSampleInfo[indx] = {index:props.componentNumber, formula:formula, ratio:ratio}

    console.log("updated to: ", props.sampleInfo)

    }


    return (
        <Stack spacing={2}>
            <TextField
            label={`Formula for component ${props.componentNumber}`}
            onKeyUp={(event) => {
                if (event.key == "Enter"){
                    const val = event.target as HTMLTextAreaElement
                    setFormula(val.value);
                    updateSampleInfo();
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
                updateSampleInfo()}}
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

    return (
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
                                    setSampleInfo={setFormulaInfo} />

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
                                        />
           
        </Grid>)
        
        }
    }
        )}

    </Grid>
    )
}