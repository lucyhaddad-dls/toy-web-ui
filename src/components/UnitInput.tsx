import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import type { EnergyUnits, LengthUnits, MassUnits, SampleUnitKeys, UnitValue } from "../models/models";
import { useState } from "react";

export function UnitSelectField ( props: {key:string, default:UnitValue,
    // could add onChange props to provider...
    onChange:(name: SampleUnitKeys, value: MassUnits | EnergyUnits | LengthUnits) => void
} ) {

    const [currentValue, setCurrentValue] = useState<MassUnits|EnergyUnits|LengthUnits>(props.default.value)
    const options:MassUnits[]|LengthUnits[]|EnergyUnits[] = props.default.options

    const valueSetter = (option:MassUnits|LengthUnits|EnergyUnits) => {
        setCurrentValue(option);
        props.onChange(props.default.name, currentValue)
    }

    return (
        <Stack>
             <FormControl variant="outlined" sx={{ m: 0.5, minWidth: 120 }}></FormControl>
            <InputLabel>{props.default.name.replace("_", " ")}</InputLabel>
            <Select value={currentValue}>
               
            {options.map((option) => (
                <MenuItem key={option}
                        value = {option}
                        selected = {currentValue === option}
                        onClick={() => valueSetter(option)}>
                    {option}
                </MenuItem>))
            }
            </Select>

        </Stack>
    )
}