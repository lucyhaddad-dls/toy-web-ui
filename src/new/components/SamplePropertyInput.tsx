import { useCallback, useContext, useState, type ChangeEvent } from "react";
import type { SampleResponseKeys } from "../../models/models";
import { SampleDataContext } from "../../context/SampleContext";
import { Grid, TextField } from "@mui/material";
import { debounce } from "../../models/queryFunctions";
import { nullSampleValues } from "../../models/defaults";

export function SamplePropertyInput (props: {name:SampleResponseKeys, defaultVal:string|null|undefined} ) {

    const { setSingleValue, currentName, sampleList } = useContext(SampleDataContext)

    let [initValue, setInitValue] = useState(sampleList.find(i => i.name == currentName)?.values.find(i => i.name == props.name)?.value.val)
    // this shouldn't happen?
    if (initValue == undefined || initValue == null){
        setInitValue("")
    }

    let init = ""
    if (props.defaultVal != undefined && props.defaultVal != null){init = props.defaultVal}

    let aValue = sampleList.find(i => i.name == currentName)
    if (aValue == undefined){
        aValue = {name:"", values: nullSampleValues}
    }

    let initial = aValue.values.find( i => i.name == props.name)?.value.val
    if (initial == null || initial == undefined){
        initial = ""
    }
 
    const handleInput = useCallback(
        debounce((val: ChangeEvent<HTMLTextAreaElement
            |HTMLInputElement, Element>) => {

                if (val.target.value != "" && val.target.value != undefined){
                    setSingleValue(props.name, val.target.value)
                }
            }, 500), []

        )

    return (
        <Grid key={`${props.name}-text-input`}>
            <TextField 
            defaultValue={init}
            label={props.name}
            onChange={handleInput}/>
        </Grid>
    )
    
}