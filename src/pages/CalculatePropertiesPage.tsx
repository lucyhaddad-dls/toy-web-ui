import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { PlotValuesPage } from "../components/PlotComponent";

export function TransmissionPropertiesPage() {

    const { focusedSample, getAvailableCalcs } = useContext(MultiSampleContext)

    return (
        <Stack sx={{margin:1}} spacing={3}>
            <Stack spacing={1}>
            <Typography variant="h4" align="center">
                Properties Page 1
            </Typography>
            <Typography align="center">
                Current sample is: {focusedSample.name}
            </Typography>
            <Typography align = "center">
                Current available properties are:
            </Typography>
         
             {getAvailableCalcs(focusedSample.name).map(i => 
                    <Typography align="center">{i}</Typography>
                )}

            </Stack>
            <Stack sx={{alignItems:"center"}}>
            <PlotValuesPage/>
            </Stack>
        </Stack>
    )
}