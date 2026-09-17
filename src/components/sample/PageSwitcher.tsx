import { Stack } from "@mui/material";
import { FormulaInputPage } from "./FormulaInput";
import { AbsorptionDataInputPage } from "./AbsorberInput";

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
        <AbsorptionDataInputPage/>
      </Stack>
    );
  }

  if (props.currentStep === 2) {
    return (
      <Stack sx={{ minHeight: "30vh", alignItems: "center" }}>
        Step 3 page (add phyiscal properties + save sample)
      </Stack>
    );
  }
}
