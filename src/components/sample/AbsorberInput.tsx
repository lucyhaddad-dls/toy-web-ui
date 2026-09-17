import { useContext } from "react";
import { SampleContext } from "../../context/SampleContext";
import { Grid, Stack } from "@mui/material";
import { SamplePropertyInput } from "../inputs/SamplePropertyInput";

export function AbsorptionDataInputPage() {
  const { focusedSample } = useContext(SampleContext);

  return (
    <Stack spacing={2}>
      <Stack direction="row">Absorber and Edge Input: </Stack>

      <Grid container spacing={1}>
    <Grid key={"absorber-input"}>
        <SamplePropertyInput
          sampleId={focusedSample.name}
          name={"absorber" }
        />
    </Grid>
    <Grid key={"edge-input"}>
        <SamplePropertyInput
          sampleId={focusedSample.name}
          name={"edge"}
        />
    </Grid>
      </Grid>
    </Stack>
  );
}
