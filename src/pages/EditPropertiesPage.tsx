// page for editing physical values 
// mass, density, ect 
// do similar to sample builder where the user selects from a
// dropdown list ?

import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { Link } from "react-router-dom";

export function EditSamplePage() {

    const { focusedSample } = useContext(MultiSampleContext)


    if (focusedSample.name == "_"){
        return (
            <Stack>
                <Typography align="center">
                     Sample list is empty! ...
                </Typography>
                <Typography align="center">
                    
                    Make a sample at (one of) the page(s) here:
                <Typography>
                    <Link to = "/sample-builder/mass-ratio">
                    Via Mass-Ratios</Link>
            </Typography>
                </Typography></Stack>
        )
    }

    else {
    return (
        <Stack >
            <Typography align="center">Hello !! edit sample here. </Typography>
                <Stack sx={{alignContent:"center", 
                    justifyContent:"center"}}>
              
                    <Typography align="center">
                        <b>{focusedSample.name}</b>
                        </Typography>
                <Typography align="center">
                {focusedSample.values.map((k) => 
                    `${k.name} = ${k.value.val}, `)}
                    </Typography>
           </Stack>
        </Stack>
    )
    }
}