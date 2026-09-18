import { Stack, Typography } from "@mui/material";
import { SampleInfoBox } from "../components/SampleInfoComponent";
import { useContext, useState } from "react";
import { SampleContext } from "../context/SampleContext";
import { useQuery } from "@tanstack/react-query";
import { getAllData } from "../models/queryFunctions";

export function TestCalcPage() {

  const { focusedSample } = useContext(SampleContext);
  const { error, data } = useQuery({
    queryKey: ["allData"],
    queryFn: () => getAllData(focusedSample.values),
  });


  if (error){
    return (
        <Stack>

      <Typography>
        <b>Test Calculation Page!</b>
      </Typography>
      <SampleInfoBox
        sampleName={focusedSample.name}
        showLinks={false}
        defaultOpen={true}
      />
      <Typography>{error.message}</Typography>
      </Stack>
    )
}
  return (
    <Stack>
      <Typography>
        <b>Test Calculation Page!</b>
      </Typography>
      <SampleInfoBox
        sampleName={focusedSample.name}
        showLinks={false}
        defaultOpen={true}
      />
      <Typography>sucess!</Typography>

    </Stack>

  );
}
