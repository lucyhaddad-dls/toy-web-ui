import { useContext, useState } from "react";
import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import type { AbsorptionType, SampleAbsorptionResponse } from "../models/models";
import { SampleContext } from "../context/SampleContext";
import ndarray from "ndarray";
import { DataPlot } from "./PlotCanvas";

export function PlotComponent () {

    const { availableAbs, absorption } = useContext(SampleContext)
    const [currentValue, setCurrentValue] = useState<AbsorptionType|"">("")
    const [currentElement] = useState<string>("total")

    const [xdata, setXdata] = useState<ndarray.NdArray<number[]>|null>(null)
    const [ydata, setYdata] = useState<ndarray.NdArray<number[]>|null>(null)
    const [xlabel, setXlabel] = useState<string>("")
    const [ylabel, setYlabel] = useState<string>("")

    const plotOption = () => {
        const vals = [""]
        Object.keys(availableAbs).map(k => {
            if (availableAbs[k as AbsorptionType] == true){
                vals.push(k)
            }
        })
    return vals
    }

    const [currentData, setCurrentData] = useState<null|SampleAbsorptionResponse>(null)

    const resetData = (val:string) => {
        if (val != ""){
            setCurrentValue(val as AbsorptionType)
            setCurrentData(absorption[val as AbsorptionType])

        }
    else {setCurrentValue(val); setCurrentData(null)}

    handleCurrentData()
    }

    const handleCurrentData = () => {
        if (currentData != null && Object.hasOwn(currentData, "x")){
            const tmpX = currentData.x.split(",").map(x => parseFloat(x));
            const tmpY = currentData.y.filter(y => y.name == currentElement)[0]
                                            .y.split(",").map(y => parseFloat(y))
            setXdata(ndarray(tmpX)); setYdata(ndarray(tmpY))
            setXlabel(currentData.xlabel); setYlabel(currentData.ylabel)
        }

        console.log(xdata)
    }

    return (
        <Stack direction="row" sx={{p:1}}>
            <Stack>
              <InputLabel>Values Available</InputLabel>
            <Select value={currentValue} defaultValue="">
            {plotOption().map(val => (<MenuItem
                key = {val}
                label={currentValue}
                value = {val}
                selected = {currentValue===val}
                onClick = {() => resetData(val)}
                >{val}</MenuItem>
               ))}
            </Select>
        </Stack>
            <Stack>
            <DataPlot 
            xdata={xdata}
                ydata={ydata}
                xlabel={xlabel}
                ylabel={ylabel}/>
            </Stack>
    </Stack>
    )
}   