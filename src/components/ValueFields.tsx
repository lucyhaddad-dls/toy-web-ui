import type { SampleValueResponse, SampleResponseKeys } from "../models/models";

import { Box, TextField } from "@mui/material";

export function ValueField ( 
    props: {key:string,
            default:SampleValueResponse,
            onChange:(name: SampleResponseKeys, value: string) 
                            => () => void}) {

        let initial = ""
        if (props.default != undefined){
        if (props.default.value.val != null){
            initial = props.default.value.val}}
        const defaultValue = initial

    return (
        <Box>
            <TextField
             defaultValue={defaultValue} 
             label={props.default.name}
             variant="outlined"
             onKeyUp = {(event) => {
                if(event.key == "Enter"){
                    const val = event.target as HTMLTextAreaElement
                    props.onChange(props.default.name, val.value)
                    event.preventDefault()
                }
             }} 
            />
        </Box>
    )
}