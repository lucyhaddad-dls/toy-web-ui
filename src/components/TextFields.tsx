import { useContext, useState } from "react";
import { SampleContext } from "../context/SampleContext";
import { Stack, TextField } from "@mui/material";

export function TextInput( props: {name: string, key: string}) {

    const [currentVal, setCurrentVal] = useState("")
    const {sampleValues} = useContext(SampleContext)
    
    if (currentVal==""){
    setCurrentVal(sampleValues[props.name])}

    return (<Stack>
        <TextField defaultValue={currentVal}></TextField>
    </Stack>)

}

export function MakeTextInput(){
    const { sampleValues } = useContext(SampleContext)

    return (
        Object.keys(sampleValues).map( (k) =>
        <TextInput name = {k} key = {'${k}-input'} /> )
    )
}