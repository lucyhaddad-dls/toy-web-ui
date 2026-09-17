import { Button, Stack, Typography } from "@mui/material";
import { SampleStepper } from "../components/sample/SampleStepper";
import { SampleInfoBox } from "../components/SampleInfoComponent";
import { useContext } from "react";
import { SampleContext } from "../context/SampleContext";
import { emptySampleValues } from "../models/defaults";

export function SequentialSampleBuilder() {

const steps = [
        "Add Formula/Composition",
        "Add Absorber and Edge",
        "Add other Physical Properties",];

  const {focusedSample, setFocusedSample} = useContext(SampleContext)
  const onNewSample = () => {
    setFocusedSample(emptySampleValues)
  }

  return (<Stack spacing={1} sx={{m:2}}>
    <Typography align="center"><b>Sample Builder</b></Typography>

    <Stack direction="row" spacing={2}>
    <SampleInfoBox sampleName={focusedSample.name} showLinks={false}
    defaultOpen={false}/>
    <Button variant="contained" 
    onClick = {onNewSample}>Make New Sample</Button>
    </Stack>
    <SampleStepper steps={steps}/>
  </Stack>)
}
