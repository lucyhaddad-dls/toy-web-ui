import ndarray from "ndarray";
import { type Domain, getDomain, VisCanvas, DataCurve } from "@h5web/lib";

function DataPlot(props: {xdata:ndarray.NdArray<number[]>|null,
                                ydata:ndarray.NdArray<number[]>|null, 
                                xlabel:string, 
                                ylabel:string}){

    const ydomain:Domain|undefined = props.ydata ? getDomain(props.ydata): [0, 1];
    const xdomain:Domain|undefined = props.xdata ? getDomain(props.xdata): [0, 1];

                            
    return (
      <div>
       <VisCanvas 
        abscissaConfig={{
          visDomain: xdomain ? xdomain: [0, 1], 
        label: props.xlabel }}

        ordinateConfig={{
          visDomain: ydomain ? ydomain: [0, 1],
        label: props.ylabel }}
      
        >
          {props.ydata && props.xdata && (
            <DataCurve
            abscissas={props.xdata.data}
            color="red"
            ordinates={props.ydata?.data}
            visible
            />
          )}
        </VisCanvas>
      </div>
        )
}

import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { SampleDataContext } from "../../context/SampleContext";
import { getAbsorptionData } from "../../models/queryFunctions";
import { type AbsorptionType, type SampleAbsorptionResponse } from "../../models/models";



export function PlotValuesPage() {

    const {focusedSample, photoData, setPhotoData, getAvailableData} = useContext(SampleDataContext)

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
            getAbsorptionData(currentPlotValue as AbsorptionType).then(data => {

                setPhotoData({...photoData, [currentPlotValue]:data})})
               
        }
        // TEST, change later...
        // currentData did not work for some reason.
        setPlotData(photoData.mass)
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
            {(focusedSample != undefined) &&
            <Stack>
            <FormControl size="medium" sx={{minWidth:"10%"}}>
            <InputLabel id="photo-select-label">
            Photo Value</InputLabel>
            
            <Select labelId="photo-select-label"
            id="photo-select" value={currentPlotValue}
            label="Photo Value">
            {getAvailableData(focusedSample.name).filter(i => 
                i.includes("absorption")).map(i => <MenuItem
                     value={iSplit(i)}
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
                value={currentElement}>
                {elementList.map(i => <MenuItem value={i}
                selected={currentElement===i}
                onClick = {() => {setCurrentElement(i); handlePlotData()}}
                >{i}</MenuItem>)}
                </Select>
            

            </FormControl>
            </Stack>
        }
            </Stack>
        <Stack >
        <DataPlot xdata={xdata} ydata={ydata} xlabel={xlabel} ylabel={ylabel}/>
        </Stack>
        </Stack>

    )
}