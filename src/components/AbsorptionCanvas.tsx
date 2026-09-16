import ndarray from "ndarray";
import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useState } from "react";

import { type SampleAbsorptionResponse } from "../models/models";
import { AbsPlot } from "./AbsorptionPlot";


export function AbsPlotCanvas(props:{data:SampleAbsorptionResponse}) {

    const [currentElement, setCurrentElement] = useState<string>("total")

    const [elementList, setElementList] = useState<string[]>(["total"])

    const [xdata, setXdata] = useState<ndarray.NdArray<number[]>|null>(null)
    const [ydata, setYdata] = useState<ndarray.NdArray<number[]>|null>(null)
    const [xlabel, setXlabel] = useState<string>("")
    const [ylabel, setYlabel] = useState<string>("")

    const handlePlotData = () => {
    
        const tmpX = props.data.x.split(",").map(x=>parseFloat(x));
        const tmpY = props.data.y.filter(y => y.name == currentElement)[0]
                                        .y.split(",").map(y => parseFloat(y));
        setXdata(ndarray(tmpX)); setYdata(ndarray(tmpY))
        setXlabel(props.data.xlabel); setYlabel(props.data.ylabel)
        setElementList(props.data.y.map(i=>i.name))
    }



    return (
        <Stack spacing={2}>
 
        <Stack direction="row" spacing={2} >
            <Stack>
            <FormControl size="medium" sx={{minWidth:"10%"}}>
                <InputLabel id="element-select-label">
                Element</InputLabel>
                <Select labelId="element-select-label"
                id="element-select"
                value={currentElement}>
                {elementList.map(i => <MenuItem value={i}
                selected={currentElement===i}
                onClick = {() => {setCurrentElement(i); handlePlotData()}}
                >{i}</MenuItem>)}
                </Select>

            </FormControl>
            </Stack>
        
            </Stack>
        <Stack >
        <AbsPlot xdata={xdata} ydata={ydata} xlabel={xlabel} ylabel={ylabel}/>
        </Stack>
        </Stack>

    )
}