import { useState } from "react";
// import { type AbsorptionType } from "../models/models";
import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import type { AbsorptionType } from "../models/models";
// import { getAbsorptionData } from "../models/queryFunctions";

export function PlotComponent (props: {currentData: {"mass":boolean, 
                                                    "linear":boolean, 
                                                    "total":boolean}}) {


                                                        // yikes
    const [plotOptions, setPlotOptions] = useState<string[]>(Object.keys(Object.fromEntries(
        Object.entries(props.currentData).filter(([_key, value]) => {if(value == true){return _key}}))))

    
    const [currentValue, setCurrentValue] = useState<AbsorptionType>("mass")


    return (
        <Stack> hello from plot component
        <Stack direction="row">
            <InputLabel>Plot Value</InputLabel>
            <Select value={currentValue}>
               {plotOptions.map(val => (
                <MenuItem
                key = {val}
                label={currentValue}
                value = {val}
                selected = {currentValue===val}
                onClick = {() => {setCurrentValue(val as AbsorptionType)}}
                >{val}</MenuItem>
               ))

               }
            </Select>
        </Stack>
        </Stack>
    )
}   