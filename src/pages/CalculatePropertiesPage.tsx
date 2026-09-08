import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { PlotValuesPage } from "../components/PlotComponent";
import { Link } from "react-router-dom";

export function TransmissionPropertiesPage() {

    const { focusedSample, getAvailableCalcs } = useContext(MultiSampleContext)

    return (
        <Stack sx={{margin:1}} spacing={3}>
            <Stack spacing={1}>
            <Typography variant="h4" align="center">
                Properties Page 1
            </Typography>
        <Stack direction="row" sx = {{justifyContent:"space-around"}}>
        <Stack>
            <Typography align="center">
                Current sample is: {focusedSample.name}
            </Typography>
           
            </Stack>
             <Typography align = "center">
                Current available properties are: 
             {getAvailableCalcs(focusedSample.name).map(i => 
            <b> {i}</b>)}
            </Typography>
        <Button variant="contained" sx = {{ bgcolor:"#586fbb"}}>
        <Link to="/sample-builder/edit">
           <Typography sx={{color:"white"}}>
            <b>Back to sample editor</b>
            </Typography>
        </Link>
        </Button>
            </Stack>
        </Stack>
            <Stack sx={{alignItems:"center"}}>
            <PlotValuesPage/>
            </Stack>
        </Stack>
    )
}