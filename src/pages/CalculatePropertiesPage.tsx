import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { PlotValuesPage } from "../components/PhotoAbsComponent";
import { Link } from "react-router-dom";

export function TransmissionPropertiesPage() {

    const { focusedSample, getAvailableCalcs, sampleList, setFocusedSample } = useContext(MultiSampleContext)

    const onSampleChange = (name:string) => {
        setFocusedSample(sampleList.filter(i => i.name == name)[0])
    }

    return (
        <Stack sx={{margin:1}} spacing={3}>
            <Stack spacing={1}>
            <Typography variant="h4" align="center">
                Properties Page
            </Typography>
        <Stack direction="row" sx = {{justifyContent:"space-between",
            margin:"1" }}>
        <Stack spacing={1}>
            <FormControl fullWidth>
                <InputLabel id="select-focus-label">
                Select Sample
                </InputLabel>
            <Select labelId="select-focus-label"
            id="select-focus" value={""}>
            {sampleList.map(i =>
                 <MenuItem value={i.name}
                 onClick={() =>onSampleChange(i.name)}
                 >
                    {i.name}</MenuItem>)}
            </Select>
            </FormControl>

            <Typography align="center">
                Current sample is: {focusedSample.name}
            </Typography>
            </Stack>
             <Typography align = "center">
                Current available properties are: 
             {getAvailableCalcs(focusedSample.name).map(i => 
            <b> {i}</b>)}
            </Typography>
        <Button variant="contained" sx = {{ bgcolor:"#586fbb", marginRight:"2%"}}>
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