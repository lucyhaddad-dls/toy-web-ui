import ndarray from "ndarray";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";

import { type SampleAbsorptionResponse } from "../../models/models";
import { AbsPlot } from "./AbsorptionPlot";

export function AbsPlotCanvas(props: { data: SampleAbsorptionResponse }) {
  const [currentElement, setCurrentElement] = useState<string>("total");

  const [elementList] = useState<string[]>(props.data.y.map((i) => i.name));

  const [ydata] = useState<Array<number>>(
    props.data.y.filter((i) => i.name == currentElement)[0].y,
  );

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Stack>
          <FormControl size="medium" sx={{ minWidth: "10%" }}>
            <InputLabel id="element-select-label">Element</InputLabel>
            <Select
              labelId="element-select-label"
              id="element-select"
              value={currentElement}
            >
              {elementList.map((i) => (
                <MenuItem
                  value={i}
                  selected={currentElement === i}
                  onClick={() => {
                    setCurrentElement(i);
                  }}
                >
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <Stack>
        <AbsPlot
          xdata={ndarray(props.data.x)}
          ydata={ndarray(ydata)}
          xlabel={props.data.xlabel}
          ylabel={props.data.ylabel}
        />
      </Stack>
    </Stack>
  );
}
