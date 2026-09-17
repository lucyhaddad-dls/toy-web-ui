import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { AbsPlotWrapper } from "../components/plot/AbsorptionPlotWrapper";
import { useContext, useState } from "react";
import { SampleContext } from "../context/SampleContext";
import type { AbsorptionType } from "../models/models";

export function AbsorptionPlotPage() {

  const {focusedSample, getAvailableData} = useContext(SampleContext)
  const [currentPlotValue, setCurrentPlotValue] = useState<AbsorptionType | "">(
    "",
  );

  const iSplit = (value: string) => {
    return value.split("_")[0];
  };

  const onPlotValueChange = (name: string) => {
    setCurrentPlotValue(name as AbsorptionType);

    console.log(currentPlotValue);
  };

  return (
    <Stack sx={{ m: 2 }}>
      <Typography>Current sample is: {focusedSample.name}</Typography>
      <FormControl size="medium" sx={{ minWidth: "10%" }}>
        <InputLabel id="photo-select-label">Photo Value</InputLabel>

        <Select
          labelId="photo-select-label"
          id="photo-select"
          value={currentPlotValue}
          label="Photo Value"
        >
          {getAvailableData(focusedSample.name)
            .filter((i) => i.includes("absorption"))
            .map((i) => (
              <MenuItem
                value={iSplit(i)}
                selected={currentPlotValue === iSplit(i)}
                onClick={() => onPlotValueChange(iSplit(i))}
              >
                {i}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {currentPlotValue != "" && <AbsPlotWrapper abs_type={currentPlotValue} />}
    </Stack>
  );
}
