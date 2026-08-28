import { useContext, useState } from "react";
import { unitKeys, type LengthUnits, type MassUnits,
     type SampleUnitKeys, type EnergyUnits } from "../models/models";
import { DataContext } from "../context/DataContext";
import { InputLabel, MenuItem, Select, Stack } from "@mui/material";

function UnitComboBox( props: {name:SampleUnitKeys, key:string} ){

    const { getUnit } = useContext(DataContext)

    const initial = getUnit(props.name)

    const [currentValue, setCurrentValue] = useState<string>(initial.value)
    const options:MassUnits[]|LengthUnits[]|EnergyUnits[] = initial.options

    return (
        <Stack>
            <InputLabel>{props.name.replace("_", " ")}</InputLabel>
            <Select value={currentValue}>
            
            {options.map((option) => (
                <MenuItem key={option}
                label={currentValue}
                value = {option}
                selected = {currentValue === option}
                onClick={() => setCurrentValue(option)}>
                    {option}
                </MenuItem>
            ))}
        </Select>
        </Stack>
    )
}


export function MakeUnitInput() {

    return (
        <Stack spacing={2}>
            {unitKeys.map((k, i) => 
            {return (<UnitComboBox name = {k as SampleUnitKeys} 
                                    key = {i.toString()}/>) }
                )}
        </Stack>
    )
}