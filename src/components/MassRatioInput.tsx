import type { NewSampleMassRatioType } from "../models/models";
import { Stack, TextField } from "@mui/material";
import { NumberInput } from "@diamondlightsource/sci-react-ui";

export function MassRatioInput (props: {componentIndex: number,
                        defaults: NewSampleMassRatioType,
                        // could add onChange props to provider...
                        onChange: (index: number,
                             valuetype: "formula" | "ratio",
                              value: string | number) => void
                        }) {


    const UpdateInfo = (valname:"formula"|"ratio", value:string|number) => {
        props.onChange(props.componentIndex, valname, value)
    }

    return (
        <Stack spacing={2}>
            <TextField
            label={`Formula for component ${props.componentIndex}`}
            onKeyUp = {(event) => {
                if (event.key == "Enter"){
                    const val = event.target as HTMLTextAreaElement
                    UpdateInfo("formula", val.value);
                    event.preventDefault()
                }
            }}>
                {props.defaults.formula}
            </TextField>

            <NumberInput
            label={`Mass Ratio`}
            defaultValue={props.defaults.ratio}
            minValue={0} maxValue={1}
            numberMode="floating"
            commitOnReturn={true}
            onCommit={(number) => UpdateInfo("ratio", number)}
            />
        </Stack>
    )
}
