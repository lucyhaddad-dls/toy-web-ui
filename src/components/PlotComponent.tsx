import { useContext, useState } from "react";
import { DataContext } from "../context/SampleContext";
import {
  type SampleAbsorptionResponse,
  type AbsorptionType,
  type ElementAbsorptionResponse,
  type TotalAbsorptionDataset,
} from "../models/models";
import { getAbsorptionData } from "../models/queryFunctions";
import { InputLabel, MenuItem, Stack, Select } from "@mui/material";
import ndarray from "ndarray";
import { DataPlot } from "./PlotCanvas";

export function PlotComponent() {
  const { allAbsorptionData, setAllAbsorptionData } = useContext(DataContext);

  const [absorptionData, setAbsorptionData] =
    useState<SampleAbsorptionResponse>();

  const [currentValue, setCurrentValue] = useState<AbsorptionType>("mass");

  const [elementList, setElementList] = useState<string[]>(["total"]);

  const [currentElement, setCurrentElement] = useState<string>("total");

  const setCurrentData = () => {
    getAbsorptionData(currentValue).then((data) => {
      setAbsorptionData(data);

      if (absorptionData != undefined) {
        if (
          allAbsorptionData != undefined &&
          Object.hasOwn(allAbsorptionData, currentValue)
        ) {
          const out: TotalAbsorptionDataset = {
            ...allAbsorptionData,
            [currentValue]: absorptionData,
          };
          setAllAbsorptionData(out);
        }
      }

      if (absorptionData == undefined) {
        setElementList(["total"]);
      } else if (Object.hasOwn(absorptionData, "y")) {
        setElementList(data.y.map((e: ElementAbsorptionResponse) => e.name));
      } else {
        setElementList(["total"]);
        setCurrentElement("total");
      }
    });
    return () => {};
  };

  const [xdata, setXdata] = useState<ndarray.NdArray<number[]> | null>(null);
  const [ydata, setYdata] = useState<ndarray.NdArray<number[]> | null>(null);
  const [xlabel, setXlabel] = useState<string>("");
  const [ylabel, setYlabel] = useState<string>("");

  const handleAbsorptionData = () => {
    if (absorptionData != undefined && Object.hasOwn(absorptionData, "y")) {
      const tmpX = absorptionData.x.split(",").map((n) => parseFloat(n));
      const tmpY = absorptionData.y.filter((n) => n.name == currentElement)[0];
      const tmpY2 = tmpY.y.split(",").map((n) => parseFloat(n));

      setXdata(ndarray(tmpX));
      setYdata(ndarray(tmpY2));
      setXlabel(absorptionData.xlabel);
      setYlabel(absorptionData.ylabel);
    }
  };

  return (
    <Stack spacing={5}>
      <Stack direction="row" spacing={5}>
        <InputLabel>Value to plot</InputLabel>
        <Select value={currentValue}>
          {["mass", "linear", "total"].map((val) => (
            <MenuItem
              key={val}
              label={currentValue}
              value={val}
              selected={currentValue === val}
              onClick={() => {
                setCurrentValue(val as AbsorptionType);
                setCurrentData();
                handleAbsorptionData();
              }}
            >
              {" "}
              {val}
            </MenuItem>
          ))}
        </Select>

        <InputLabel>Elements to plot</InputLabel>
        <Select value={currentElement}>
          {elementList.map((element) => (
            <MenuItem
              key={element}
              label={currentElement}
              value={element}
              selected={currentElement === element}
              onClick={() => {
                setCurrentElement(element);
                handleAbsorptionData();
              }}
            >
              {element}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <DataPlot xdata={xdata} ydata={ydata} xlabel={xlabel} ylabel={ylabel} />
    </Stack>
  );
}
