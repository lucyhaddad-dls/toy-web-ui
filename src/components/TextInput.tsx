import { useContext, useState } from "react"
import { MultiSampleContext } from "../context/SampleContext"
import type { SampleResponseKeys } from "../models/models"
import { Grid, TextField } from "@mui/material"

export function TextInput (props: {name:SampleResponseKeys}){

    const { setSingleValue, getSingleValue } = useContext(MultiSampleContext)
    const [currentValue] = useState<string>(getSingleValue(props.name))

    return (
        <Grid key={props.name}>
            <TextField
            defaultValue={currentValue}
            label={props.name}
            variant="outlined"
            onKeyDown={(event) => { if (event.key == "Enter"){
                const val = event.target as HTMLTextAreaElement
                // set filters here...
                if (val.value != "" || val.value != undefined){
                setSingleValue(props.name, val.value)
                }
                event.preventDefault();
                }}}
            />
        </Grid>
    )
        
}