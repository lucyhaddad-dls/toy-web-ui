// do i want get to be handled here or by the provider..?

import { FormControl, Grid, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { MultiSampleContext } from "../context/SampleContext";

export function PlotValuesPage() {

    const { focusedSample, getAvailableCalcs } = useContext(MultiSampleContext)
    const [availablePhoto] = useState<string[]>(getAvailableCalcs(focusedSample.name).filter(
                                                                    i => i.includes("absorption")))

    // trying handling photo data here first (instead of provider)
    const getPhotoData = () => {

        if (availablePhoto.includes("mass_absorption")){
            console.log("mass photo")
        }
        if (availablePhoto.includes("linear_absorption")){
            console.log("linear photo")
        }
        if (availablePhoto.includes("total_absorption")){
            console.log("total photo")
        }
    }

    getPhotoData()


    return (
        <Stack spacing={2} sx={{alignItems:"center"}}>
            This is a page to plot some stuff.
        <Grid container spacing={2} sx={{width:"100vw"}}>

        <Grid size={{xs:1, md:2}} sx = {{margin:1}}>
            <FormControl fullWidth>
            <InputLabel id="photo-select-label">
            Photo Value</InputLabel>
            <Select labelId="photo-select-label"
            id="photo-select" value={""}
            label="Photo Value">
            {availablePhoto.map(i => <MenuItem value={i}>{i}</MenuItem>)}

            </Select>

            </FormControl>

        </Grid>
        </Grid>
        </Stack>

    )
}