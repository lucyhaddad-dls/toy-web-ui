import type { SampleMassRatioType } from "../../models/models";
import { Stack, TextField } from "@mui/material";
import { NumberInput } from "@diamondlightsource/sci-react-ui";
import { useCallback } from "react";
import { debounce } from "../../models/queryFunctions";
import type { ChangeEvent } from "react";

export function MassPercentInput (props: {componentIndex: number,
                        defaults: SampleMassRatioType,
                        onChange: (index: number,
                             valuetype: "formula" | "pc",
                              value: string | number) => void}) {

    const onInput = useCallback(
        debounce((val:ChangeEvent<HTMLTextAreaElement
            |HTMLInputElement, Element>, valname:"formula"|"pc") => {
        if (val.target.value != undefined){
            props.onChange(props.componentIndex, valname, val.target.value)
        } }, 200), [])

        // add into on atomic mass ?

    return (
    
        <Stack spacing={2}>
            <TextField
            label={`Formula for component ${props.componentIndex}`}

            onChange={(event) => onInput(event, "formula")}
            defaultValue={props.defaults.formula}>
                {props.defaults.formula}
            </TextField>

            <NumberInput
            label={`Mass %`}
            defaultValue={props.defaults.ratio*100}
            minValue={0} maxValue={100}
            numberMode="floating"
            commitOnReturn={true}
            onCommit={(number:number) => props.onChange(props.componentIndex, 
                "pc", number/100)}
            />
        </Stack>
    )
}