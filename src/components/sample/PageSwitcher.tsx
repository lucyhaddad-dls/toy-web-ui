import { Stack } from "@mui/material";
import { FormulaInputPage } from "./FormulaInput";

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
        Step 2 page (absorber + edge)
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
