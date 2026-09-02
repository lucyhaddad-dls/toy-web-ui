import {Box, Grid, Stack } from "@mui/material";
import { ValueField } from "../components/ValueFields";
import type { SampleResponseKeys } from "../models/models";


export function TransmissionPage () {


    return (
        <Stack sx={{alignItems:"center"}} >

         <Box sx={{ p:4 }}>
            Sample Measurement Inputs
         </Box>

        <Grid container
            rowSpacing={1} 
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            {["formula", "absorber", "edge"].map((k, i) =>
           { return (<Grid key={i.toString()}>
                <ValueField name = {k as SampleResponseKeys}
                            key ={i.toString()}/>
                    </Grid>) } )}

            {["density", "area", "thickness", "mass"].map((k, i) =>
           { return (<Grid key={i.toString()}>
                <ValueField name = {k as SampleResponseKeys}
                            key ={i.toString()}/>
            </Grid>) } )}

        </Grid>
        </Stack>
    )
}