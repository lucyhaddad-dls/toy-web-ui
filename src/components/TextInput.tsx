import { useCallback, useContext, type ChangeEvent } from "react"
import { MultiSampleContext } from "../context/SampleContext"
import type { SampleResponseKeys } from "../models/models"
import { TextField, Grid } from "@mui/material"
import { debounce } from "../models/queryFunctions"

export function TextInput (props: {name:SampleResponseKeys}){

    const { setSingleValue, getSingleValue } = useContext(MultiSampleContext)

    const handleInput = useCallback(
            debounce((val:ChangeEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
                if (val.target.value != "" && val.target.value != undefined){
               setSingleValue(props.name, val.target.value)
                }
            }, 500,), []
        )
 

    return (
        <Grid key={props.name}>
            <TextField
            defaultValue={getSingleValue(props.name)}
            label={props.name}
            variant="outlined"
            onChange={handleInput}
            />
        </Grid>
    )
        
}