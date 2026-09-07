import { useState } from "react";
import type { EnergyUnits, LengthUnits, MassUnits,
     UnitValue} from "../models/models";
import { defaultSampleUnits } from "../models/defaults";
import { InputLabel, MenuItem, Select, Stack } from "@mui/material";

function SingleUnitDropdown(props: {unitType:string, 
                        onUnitChange:(type:"mass_unit"|"length_unit"|"energy_unit",
                        option:MassUnits|LengthUnits|EnergyUnits)=>void
}) {
    
    const options = defaultSampleUnits.filter(itm => itm.name == props.unitType)[0].options
    const [currentOption, setCurrentOption] = useState(defaultSampleUnits.filter(itm => 
                                                            itm.name == props.unitType)[0].value)

    return (
        <Stack>
            <InputLabel key={props.unitType} id={props.unitType}>
             {props.unitType.replace("_"," ")}
            </InputLabel>
            <Select value={currentOption}>
            {options.map(option => (
                <MenuItem key={option}
                value={option}
                selected={currentOption===option}
                onClick={() => {setCurrentOption(option); 
                            props.onUnitChange(props.unitType as "mass_unit" | "energy_unit"|"length_unit", 
                            option)}}>
                    {option}
                </MenuItem>))}
            </Select>
        </Stack>
    )
}


export function UnitSelectComponent () {

    const [currentValues, setCurrentValues] = useState<UnitValue[]>(defaultSampleUnits)

    const onChange = (type:"mass_unit"|"energy_unit"|"length_unit", 
                option:MassUnits|LengthUnits|EnergyUnits) => {

        const newValues = currentValues.map(i => {
             if (i.name == type){
                return {...i, value: option}
             }
             else {return i}
        })

    setCurrentValues(newValues)
    }

    return (
    <Stack direction="row" spacing={1}>
        {
    ["mass_unit", "energy_unit", "length_unit"].map(val => 
            <SingleUnitDropdown key={val} unitType={val}
             onUnitChange={onChange}/>
        )
    }
    </Stack>
    )
    
}