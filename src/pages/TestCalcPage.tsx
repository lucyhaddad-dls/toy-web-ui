import { Grid, Stack, Typography } from "@mui/material";
import { SampleInfoBox } from "../components/SampleInfoComponent";
import { useContext } from "react";
import { SampleContext } from "../context/SampleContext";
import { useQuery } from "@tanstack/react-query";
import { getAllData } from "../models/queryFunctions";
import type { MeasurementResponse } from "../models/models";
import { MathJax } from "better-react-mathjax";
import { AbsorptionPlot } from "../components/plotting/PlotCanvas";

export function TestCalcPage() {
  const { focusedSample } = useContext(SampleContext);
  const {isPending, error, data } = useQuery({
    queryKey: ["allData"],
    queryFn: () => getAllData(focusedSample.values),
  });

  // let scalarVals: [string, MeasurementResponse][] = [];
  let measuredVals: [string, MeasurementResponse][] = [];

  if (data) {
    // scalarVals = Object.entries(data.total).filter(
      // (i) => Object.keys(i[1]).includes("unit") && i[1].unit == null,
    // );
    measuredVals = Object.entries(data.total).filter(
      (i) => Object.keys(i[1]).includes("unit") && i[1].unit != null,
    );
  }

  if (isPending){
    return (
      <Stack sx={{m:1}}>
        <Typography><b>Test Calculation Page!</b></Typography>
        <Typography>Data pending.....</Typography>
      </Stack>
    )
  }

  if (error) {
    return (
      <Stack sx={{m:1}}>
        <Typography>
          <b>Test Calculation Page!</b>
        </Typography>
        <SampleInfoBox
          sampleName={focusedSample.name}
          showLinks={false}
          defaultOpen={true}
        />
        <Typography>No Sample Results :(</Typography>
        <Typography>{error.message}</Typography>
      </Stack>
    );
  }
  return (
    <Stack sx={{m:1}}>
      <Typography>
        <b>Test Calculation Page!</b>
      </Typography>
      <SampleInfoBox
        sampleName={focusedSample.name}
        showLinks={false}
        defaultOpen={true}
      />

    <Stack direction="row">
    <Stack>
      <Typography>Some results!!!!</Typography>
        <Grid container spacing={2}>
          {measuredVals.map((i) => {
            const val = Number(i[1].value).toPrecision(5);
            const unit = i[1].unit
            const title = i[0];

            if (val != "NaN"){
            return (
                <Grid >
                <Stack direction="row" spacing={0.5}>
                <Stack>
                {title} = {val} 
                </Stack>
                <MathJax>{unit}</MathJax>
                </Stack>
                </Grid>
            );}
          })}
           </Grid>
          </Stack>
        <AbsorptionPlot data={data}/>
        </Stack>

    </Stack>
  );
}
