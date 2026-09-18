import { Stack } from "@mui/material";
import { FormulaInputPage } from "./FormulaInput";
import { AbsorptionDataInputPage } from "./AbsorberInput";
import { InputPagePellet } from "./PhysicalPropsInput";
import { SampleTypeSelect } from "../inputs/SampleTypeInput";

export function PageSwitcher(props: { currentStep: Number }) {
  if (props.currentStep === 0) {
    return (
      <Stack sx={{ minHeight: "30vh", alignItems: "center" }}>
        <FormulaInputPage />
      </Stack>
    );
  }
  if (props.currentStep === 1) {
    return (
      <Stack sx={{ minHeight: "30vh", alignItems: "center" }}>
        <AbsorptionDataInputPage />
      </Stack>
    );
  }

  if (props.currentStep === 2) {
    return (
      <Stack sx={{ minHeight: "30vh", alignItems: "center" }}>
        <SampleTypeSelect/>
      </Stack>
    );
  }

  if (props.currentStep === 3) {
    return (
      <Stack sx={{ minHeight: "30vh", alignItems: "center" }}>
        {/* just setting this to be a pellet right now. */}
        <InputPagePellet />
      </Stack>
    );
  }
}
