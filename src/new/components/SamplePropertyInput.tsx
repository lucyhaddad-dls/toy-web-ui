import { useCallback, useContext, useState, type ChangeEvent } from "react";
import type { SampleResponseKeys } from "../../models/models";
import { SampleDataContext } from "../../context/SampleContext";
import { Grid, TextField } from "@mui/material";
import { debounce } from "../../models/queryFunctions";

export function SamplePropertyInput (props: {sampleId:string,
    name:SampleResponseKeys, defaultVal:string|null|undefined} ) {

    const { setSingleValue, getSample } = useContext(SampleDataContext)


    const sample = getSample(props.sampleId)
    let [initValue, setInitValue] = useState(sample.values.find(i => i.name == props.name)?.value.val)
    if (initValue == undefined || initValue == null){
        setInitValue("")
    }

    let init = ""
    if (props.defaultVal != undefined && props.defaultVal != null){init = props.defaultVal}

 
    const handleInput = useCallback(
        debounce((val: ChangeEvent<HTMLTextAreaElement
            |HTMLInputElement, Element>) => {

            if ( val.target.value != undefined){
                setSingleValue(props.name, val.target.value, props.sampleId)
                }
           
            }, 500), [] )

    return (
        <Grid key={`${props.name}-text-input`}>
            <TextField 
            defaultValue={init}
            label={props.name}
            onChange={handleInput}/>
        </Grid>
    )
    
}