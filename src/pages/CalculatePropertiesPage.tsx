import { List, ListItem, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { MultiSampleContext } from "../context/SampleContext";

export function TransmissionPropertiesPage() {

    const { focusedSample, getAvailableCalcs } = useContext(MultiSampleContext)

    return (
        <Stack>
            <Typography variant="h4" align="center">
                Properties Page 1
            </Typography>
            <Typography align="center">
                Current sample is: {focusedSample.name}
            </Typography>
            <Typography align = "center">
                Current available properties are:
            </Typography>
            <List>
                {getAvailableCalcs(focusedSample.name).map(i => 
                    <ListItem>{i}</ListItem>
                )}
            </List>
        </Stack>
    )
}