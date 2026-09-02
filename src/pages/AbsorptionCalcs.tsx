import { Box, Stack } from "@mui/material";
import { MakeTextInput } from "../components/TextFields";
import { MakeUnitInput } from "../components/UnitFields";
import { PlotComponent } from "../components/PlotComponent";



export function AbsorptionCalcPage () {

    return (
    <Stack direction="row" spacing={4} >
        <Box sx = {{ p:2 }}/>
        <MakeTextInput/>
        <MakeUnitInput/>
        <PlotComponent/>
  </Stack>
     )
}