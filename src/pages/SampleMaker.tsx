import { Box, Button, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { PopUpBuilderPage } from "../components/MassRatioPopup";
import { SavedSampleList } from "../components/SavedSampleList";
import Collapse from '@mui/material/Collapse';

function SampleMakerPopUp() {

  const onClick = () => { setShowBuilder(!showBuilder) };

  const [showBuilder, setShowBuilder] = useState<boolean>(false)

  return (
    <Stack sx = {{ p:1 }}>
      <Button onClick={onClick} variant="contained">
        {showBuilder ? 'Close Sample Maker' : 'Open Sample Maker'}
    </Button>
    <Collapse in = {showBuilder}>
      <Box sx={{ p: 0.5 }} />
      <PopUpBuilderPage/>
    </Collapse>
   
    </Stack>
  );
}

export function TestSamplePage() {
  return (
    <Grid container sx = {{display: "flex",  justifyContent: 'space-between' }}>
      <Grid sx = {{maxWidth: "60%"}}>
      <SampleMakerPopUp />
      </Grid>
      <Grid>
      <SavedSampleList/>
      </Grid>
    </Grid>
  );
}
