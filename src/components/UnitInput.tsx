import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import type { EnergyUnits, LengthUnits, MassUnits, UnitValue } from "../models/models";
import { useState } from "react";

export function UnitSelectField ( props: {key:string, default:UnitValue} ) {

    const [currentValue, setCurrentValue] = useState<string>(props.default.value)
    const options:MassUnits[]|LengthUnits[]|EnergyUnits[] = props.default.options


    return (
        <Stack>
             <FormControl variant="outlined" sx={{ m: 0.5, minWidth: 120 }}></FormControl>
            <InputLabel>{props.default.name.replace("_", " ")}</InputLabel>
            <Select value={currentValue}>
               
            {options.map((option) => (
                <MenuItem key={option}
                        value = {option}
                        selected = {currentValue === option}
                        onClick={() => setCurrentValue(option)}>
                    {option}
                </MenuItem>))
            }
            </Select>

        </Stack>
    )
}