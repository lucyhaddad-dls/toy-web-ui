import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import type { AbsorptionType, ElementAbsorptionResponse } from "../models/models";
import { getAbsorptionData } from "../models/queryFunctions";
import { InputLabel, MenuItem, Stack, Select } from "@mui/material";

export function PlotComponent() {

    const { absorptionData, setAbsorptionData } = useContext(DataContext)


    const [currentValue, setCurrentValue] = useState<AbsorptionType>("mass")

    const [elementList, setElementList] = useState<string[]>(["total"])

    const [currentElement, setCurrentElement] = useState<string>("total")

    const setCurrentData = () => {
    getAbsorptionData(currentValue).then(
        
        data => {setAbsorptionData(data);
        if (absorptionData == undefined){
            setElementList(["total"])
        }
        else if (Object.hasOwn(absorptionData, "y")){
            setElementList(data.y.map((e:ElementAbsorptionResponse) => e.name))}
        else {setElementList(["total"]); setCurrentElement("total")}
        });
        return () => {}
    }

    // handle x, y, + labels here?

    return (


    <Stack direction="row" spacing={5}>
        <InputLabel>
        Value to plot
        </InputLabel>
        <Select value = {currentValue}>
            {["mass", "linear", "total"].map((val) => 
            (
            <MenuItem key={val}
                label={currentValue}
                value = {val}
                selected={currentValue === val}
                onClick = {() => {setCurrentValue(val as AbsorptionType);
                setCurrentData() }}> {val}
            </MenuItem> )
            )}
        </Select>

         <InputLabel>Elements to plot</InputLabel> 
         <Select value = {currentElement}>

            {elementList.map((element) => (
                <MenuItem key = {element}
                label= {currentElement}
                value = {element}
                selected = {currentElement === element}
                onClick = {() => {setCurrentElement(element)
                    // CHANGE DATA IN PLOT HERE
                }}>
                    {element}
                </MenuItem>
            ))}
        

        </Select>


        </Stack>

    )
}