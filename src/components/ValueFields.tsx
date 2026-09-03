import type { SampleValueResponse, SampleResponseKeys } from "../models/models";

import { Box, TextField } from "@mui/material";

export function ValueField ( 
    props: {key:string,
            default:SampleValueResponse,
            onChange:(name: SampleResponseKeys, value: string) 
                            => () => void}) {

        // eslint-disable-next-line no-useless-assignment
        let initial = ""
    
        if (props.default == undefined || props.default.value.val == null || 
            props.default.value.val == "None" || props.default.value.val == ""
        ) {  initial = ""}
        else { initial = props.default.value.val}

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