// give a go at using tanstack query/debouncing(?) for the plot data issue.

import { useQuery } from "@tanstack/react-query";
import { getAbsorptionData } from "../../models/queryFunctions";
import type { AbsorptionType } from "../../models/models";
import { Stack } from "@mui/material";
import { AbsPlotCanvas } from "./AbsorptionCanvas";
import { useContext } from "react";
import { SampleDataContext } from "../../context/SampleContext";

export function AbsPlotWrapper(props: { abs_type: AbsorptionType }) {
  const { focusedSample } = useContext(SampleDataContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["absData"],
    queryFn: () => getAbsorptionData(focusedSample.values, props.abs_type),
  });

  if (isPending) return <Stack>Loading!</Stack>;
  if (error) return <Stack>ERROR: {error.message}</Stack>;

  return <AbsPlotCanvas data={data} />;
}
