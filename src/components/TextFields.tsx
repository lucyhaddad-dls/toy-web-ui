import { useContext } from "react";
import { type SampleResponseKeys } from "../models/models";
import { DataContext } from "../context/DataContext";
import { postSampleData } from "../models/queryFunctions";
import { TextField, Stack, Box } from "@mui/material";

function TextInput( props: {name: SampleResponseKeys,
                            key: string} )
{
    
    const {getSingleValue} = useContext(DataContext)

    const initialValue = getSingleValue(props.name)

    const updateValue = (value: string) => {
        if (value != ""){
            if (value != getSingleValue(props.name)){
                postSampleData(props.name, value) } }
                    }
    return (

        <Box>
            <TextField defaultValue={initialValue} 
            label = {props.name}
            variant="outlined"
            onKeyUp={ (event) => {
            if (event.key == "Enter") {
          const val = event.target as HTMLTextAreaElement
          updateValue(val.value)
          event.preventDefault() } } }  />
        </Box>
    )
}

export function MakeTextInput () {

    return (
    <Stack direction="row" spacing={2} >
        <Stack spacing={{xs: 2, sm: 9.5}}>
        {["formula", "absorber", "edge"].map((k, i) => 
        {
            return (
                <TextInput name = {k as SampleResponseKeys} 
                key = {i.toString()} />
            )
        }
        )}
        </Stack>
        <Stack spacing={{xs: 2, sm: 4}}>
            {["density", "area", "thickness", "mass"].map((k, i) => 
        {
            return (
                <TextInput name = {k as SampleResponseKeys} 
                key = {i.toString()}/>
            )
        }
        )}
        </Stack>
    </Stack>
    )
}


