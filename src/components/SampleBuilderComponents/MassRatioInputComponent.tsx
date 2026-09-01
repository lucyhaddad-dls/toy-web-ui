import { Fab, Stack, TextField } from "@mui/material";
import { use, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { NumberInput } from "@diamondlightsource/sci-react-ui";

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

    const tmp = [...Array(inputCount).keys()]
    console.log("test: ", tmp)

    return (
    <Stack direction="row" spacing={2}>
        {
        [...Array(inputCount).keys()].map((i) => { 
            return ( <Stack>
            <MassRatioInputComponent componentNumber={i}/>
             <Fab
                color="primary"
                size="medium"
                variant="circular"
                onClick={() => setInputCount(inputCount+1)}
                >
                <AddIcon/>
            </Fab>
        </Stack>)
            })
            }
    </Stack>
    )
}