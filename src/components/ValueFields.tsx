import { useContext } from "react";
import type { SampleResponseKeys } from "../models/models";
import { SampleContext } from "../context/DataContext";
import { postSampleData } from "../models/queryFunctions";
import { Box, TextField } from "@mui/material";

export function ValueField ( 
    props: {name:SampleResponseKeys, key:string}) {

    const { getValue } = useContext(SampleContext)
    
    const initialValue = getValue(props.name)

    const onUpdate = (value:string) => {
        if (value != ""){
            if (value != getValue(props.name)){
                postSampleData(props.name, value)
            }
        }
    }

    return (
        <Box>
            <TextField
             defaultValue={initialValue} 
             label={props.name}
             variant="outlined"
             onKeyUp = {(event) => {
                if(event.key == "Enter"){
                    const val = event.target as HTMLTextAreaElement
                    onUpdate(val.value)
                    event.preventDefault()
                }
             }} 
            />
        </Box>
    )
}