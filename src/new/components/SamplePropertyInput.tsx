import { useCallback, useContext, type ChangeEvent } from "react";
import type { SampleResponseKeys } from "../../models/models";
import { SampleDataContext } from "../../context/SampleContext";
import { Grid, TextField } from "@mui/material";
import { debounce } from "../../models/queryFunctions";

export function SamplePropertyInput (props: {name:SampleResponseKeys} ) {

    const { setSingleValue, currentName, sampleList } = useContext(SampleDataContext)

    let initValue = sampleList.find(i => i.name == currentName)?.values.find(i => i.name == props.name)?.value.val
    // this shouldn't happen?
    if (initValue == undefined){
        initValue = ""
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
            defaultValue={initValue}
            label={props.name}
            onChange={handleInput}/>
        </Grid>
    )
    
}