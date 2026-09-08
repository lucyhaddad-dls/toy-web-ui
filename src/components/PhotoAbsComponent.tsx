// do i want get to be handled here or by the provider..?
// i think the provider 

import { FormControl, Grid, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { getAbsorptionData } from "../models/queryFunctions";
import { type AbsorptionType, type SampleAbsorptionResponse } from "../models/models";
import ndarray from "ndarray";
import { DataPlot } from "./PhotoPlotComponent";

export function PlotValuesPage() {

    const { focusedSample, getAvailableCalcs, photoData, setPhotoData } = useContext(MultiSampleContext)

    const [currentPlotValue, setCurrentPlotValue] = useState<AbsorptionType|"">("")

    const [currentElement, setCurrentElement] = useState<string>("total")

    const [elementList, setElementList] = useState<string[]>(["total"])

    const currentData = () => {
        if (currentPlotValue != ""){
        return photoData[currentPlotValue]}
        else {return null}
    }

    const [plotData, setPlotData] = useState<SampleAbsorptionResponse|null>(currentData())

    const onPlotValueChange = (name:string) => {
        setCurrentPlotValue(name as AbsorptionType)

        if (currentPlotValue != ""){
            getAbsorptionData(currentPlotValue as AbsorptionType).then(data => 
                setPhotoData({...photoData, [currentPlotValue]:data}))
        }

        setPlotData(currentData())
        handlePlotData()
    }

    const iSplit = (value:string) => {
        return value.split("_")[0]
    }

    const [xdata, setXdata] = useState<ndarray.NdArray<number[]>|null>(null)
    const [ydata, setYdata] = useState<ndarray.NdArray<number[]>|null>(null)
    const [xlabel, setXlabel] = useState<string>("")
    const [ylabel, setYlabel] = useState<string>("")

    const handlePlotData = () => {
        if (plotData != null && Object.hasOwn(plotData, "x")){{
            const tmpX = plotData.x.split(",").map(x=>parseFloat(x));
            const tmpY = plotData.y.filter(y => y.name == currentElement)[0]
                                            .y.split(",").map(y => parseFloat(y));
            setXdata(ndarray(tmpX)); setYdata(ndarray(tmpY))
            setXlabel(plotData.xlabel); setYlabel(plotData.ylabel)
            setElementList(plotData.y.map(i=>i.name))
        }
    }
    
    }

    return (
        <Stack spacing={2}>

 
        <Stack direction="row" spacing={2} >
            <FormControl size="medium" sx={{minWidth:"10%"}}>
            <InputLabel id="photo-select-label">
            Photo Value</InputLabel>
            <Select labelId="photo-select-label"
            id="photo-select" value={currentPlotValue}
            label="Photo Value">
            {getAvailableCalcs(focusedSample.name).filter(i => 
                i.includes("absorption")).map(i => <MenuItem value={iSplit(i)}
                    selected={currentPlotValue === iSplit(i)}
                    onClick={() => onPlotValueChange(iSplit(i))}
                >{i}</MenuItem>)}
            </Select>
            </FormControl>
    
            <FormControl size="medium" sx={{minWidth:"10%"}}>
                <InputLabel id="element-select-label">
                Element</InputLabel>
                <Select labelId="element-select-label"
                id="element-select"
                value={"total"}>
                {elementList.map(i => <MenuItem value={i}
                selected={currentElement===i}
                onClick = {() => setCurrentElement(i)}
                >{i}</MenuItem>)}
                </Select>

            </FormControl>
            </Stack>

        <DataPlot xdata={xdata} ydata={ydata} xlabel={xlabel} ylabel={ylabel}/>
   
        </Stack>

    )
}