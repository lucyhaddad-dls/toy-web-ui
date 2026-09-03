import { useContext, useState } from "react";
// import { type AbsorptionType } from "../models/models";
import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import type { AbsorptionType } from "../models/models";
import { SampleContext } from "../context/SampleContext";
// import { getAbsorptionData } from "../models/queryFunctions";

export function PlotComponent () {

    const { availableAbs } = useContext(SampleContext)
    const [currentValue, setCurrentValue] = useState<AbsorptionType|"">("")

    const plotOption = () => {
        const vals = [""]
        Object.keys(availableAbs).map(k => {
            if (availableAbs[k as AbsorptionType] == true){
                vals.push(k)
            }
        })
    return vals
    }

    return (
        <Stack> hello from plot component
            <InputLabel>Values Available</InputLabel>
            <Select value={currentValue} defaultValue="">

            {plotOption().map(val => (<MenuItem
                key = {val}
                label={currentValue}
                value = {val}
                selected = {currentValue===val}
                onClick = {() => {setCurrentValue(val as AbsorptionType)}}
                >{val}</MenuItem>
               ))}

            </Select>
        
        </Stack>
    )
}   