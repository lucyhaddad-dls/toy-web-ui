// do i want get to be handled here or by the provider..?
// i think the provider 

import { FormControl, Grid, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { getAbsorptionData } from "../models/queryFunctions";
import { type AbsorptionType, type SampleAbsorptionResponse } from "../models/models";

export function PlotValuesPage() {

    const { focusedSample, getAvailableCalcs, photoData, setPhotoData } = useContext(MultiSampleContext)

    const [currentPlotValue, setCurrentPlotValue] = useState<AbsorptionType|"">("")

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
        console.log(plotData)
    }

    const iSplit = (value:string) => {
        return value.split("_")[0]
    }



    return (
        <Stack spacing={2} sx={{alignItems:"center"}}>
            This is a page to plot some stuff.
        <Grid container spacing={2} sx={{width:"100vw"}}>
        <Grid size={{xs:1, md:2}} sx = {{margin:1}}>
            <FormControl fullWidth>
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

        </Grid>
        </Grid>
        </Stack>

    )
}