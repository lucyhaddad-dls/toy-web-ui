import { Fab, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { NumberInput } from "@diamondlightsource/sci-react-ui";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
function MassRatioInputComponent (props:{componentNumber:number}) {
    
    const [formula, setFormula] = useState<string>("")
    const [ratio, setRatio] = useState<number>(1)

    return (
        <Stack spacing={2}>
            <TextField
            label={`Formula for component ${props.componentNumber}`}
            onKeyUp={(event) => {
                if (event.key == "Enter"){
                    const val = event.target as HTMLTextAreaElement
                    setFormula(val.value)
                    event.preventDefault() }
            }} >
                {formula}
            </TextField>
            <NumberInput
            label={`Mass Ratio for component
             #${props.componentNumber}`}
             defaultValue={ratio}
             minValue={0}
             maxValue={1}
             numberMode="floating"
             onCommit={(number) => {setRatio(number)}}/>
        </Stack>
    )
}

export function MassRatioInputFields () {
    
    const [inputCount, setInputCount] = useState<number>(1)

    return (
        <Grid container
         rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
        [...Array(inputCount).keys()].map((i) => { 
            if (i == inputCount-1){
            return ( <Grid key={i+1} rowSpacing={1}
            columnSpacing={1}>
            <MassRatioInputComponent componentNumber={i+1}/>
             <Fab
                color="primary"
                size="small"
                variant="circular"
                onClick={() => setInputCount(inputCount+1)}
                >
                <AddIcon/>
            </Fab>
            <Fab
            color="primary"
            size="small"
            variant="circular"
            onClick={() => {if (inputCount > 1){
                setInputCount(inputCount-1)
            }}}>
                <DeleteOutlinedIcon/>
            </Fab>
        </Grid>)
        
        }
        if (i !== inputCount){
            return ( <Grid key={i+1}>
            <MassRatioInputComponent componentNumber={i}/>
        </Grid>)
        
        }
    }
        )}
            
    </Grid>
    )
}