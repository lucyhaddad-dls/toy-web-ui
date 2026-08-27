
import {  Button, Stack } from "@mui/material";
import { type AbsorptionType } from "../models/models";
import '@h5web/lib/styles.css';
import { DataPlot } from "./PlotCanvas";
import { useContext, useState } from "react";
import ndarray from "ndarray";
import { DataContext } from "../context/DataContext";


export function PlotComponent() {


    const {getInitialAbsorption, absorptionData} = useContext(DataContext)

    if (absorptionData.mass.x == null){getInitialAbsorption();
    }

    const [currentKey, setCurrentKey] = useState<AbsorptionType>("mass")
   
    const setCurrentData = () => {
        return absorptionData[currentKey]
    }

    const remakeXy = () => {
    const tmpX = data.x != null ? 
        ndarray(data.x.split(",").map((m)=>parseFloat(m)))
                : null 
    const tmpY = data.y != null ? 
        ndarray(data.y.split(",").map((m)=>parseFloat(m)))
                : null 
    setXdata(tmpX); setYdata(tmpY)
    }

    const [data, setData] = useState(setCurrentData())

    const tmpX = data.x != null ? 
        ndarray(data.x.split(",").map((m)=>parseFloat(m)))
                : null 
    const tmpY = data.y != null ? 
        ndarray(data.y.split(",").map((m)=>parseFloat(m)))
                : null 

    const [xData, setXdata] = useState(tmpX)
        
    const [yData, setYdata] = useState(tmpY)

    const xlabel = data.xlabel != null ? data.xlabel : ""
    const ylabel = data.ylabel != null ? data.ylabel : ""


    return (
        <Stack>
            <DataPlot xdata={xData} ydata={yData} xlabel={xlabel}
             ylabel={ylabel}/> 
             <Button onClick={() => {setData(setCurrentData()); remakeXy()}} >replot</Button>
            hello from mass calculator
        </Stack>
    )
}
