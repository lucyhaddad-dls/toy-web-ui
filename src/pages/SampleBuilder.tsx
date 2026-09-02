// sample builder to have options: 

import { Stack } from "@mui/material";

import { SampleBuilderMenu } from "../components/SampleBuilderMenu";


export function SampleBuilderPage () {

    return (
        <Stack>
        <Stack direction="row">
        Sample Mass Page
        </Stack>
        <SampleBuilderMenu/>
        </Stack>
    )
}