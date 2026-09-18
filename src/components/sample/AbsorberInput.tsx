import { useContext } from "react";
import { SampleContext } from "../../context/SampleContext";
import { Grid, Stack } from "@mui/material";

import { PropertyInputWrapper } from "../inputs/PhysicalPropertyInput";

export function AbsorptionDataInputPage() {
  const { focusedSample } = useContext(SampleContext);

  return (
    <Stack spacing={2}>
      <Stack direction="row">Absorber and Edge Input: </Stack>

      <Grid container spacing={1}>
        <Grid key={"absorber-input"}>
          <PropertyInputWrapper
            sampleId={focusedSample.name}
            name={"absorber"}

          />
        </Grid>
        <Grid key={"edge-input"}>
          <PropertyInputWrapper
            sampleId={focusedSample.name}
            name={"edge"}

          />
        </Grid>
      </Grid>
    </Stack>
  );
}
