import { Stack } from "@mui/material";
import { SampleStepper } from "../components/sample/SampleStepper";

export function SequentialSampleBuilder() {

const steps = [
        "Add Formula/Composition",
        "Add Absorber and Edge",
        "Add other Physical Properties",];




  return (<Stack>Sample Builder !!!!

    <SampleStepper steps={steps}/>
  </Stack>)
}
