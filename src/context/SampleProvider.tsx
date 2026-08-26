// new and improved sample context provider able to handle updating and such.

import type React from "react";
import type {
  AbsorptionDataSet,
  SampleResponseKeys,
  SampleValue,
  UnitValue,
  SampleUnitKeys,
} from "../models/models";
import { useState } from "react";
import {
  getLinearAbsorptionData,
  getMassAbsorptionData,
  getSampleData,
  getTotalAbsorptionData,
  postSampleValue,
} from "../models/queryFunctions";
import { DataContext } from "./DataContext";
import { sampleUnitsDefault, sampleValuesDefault } from "../models/defaults";

export function SampleProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [sampleUnits, setSampleUnits] =
    useState<UnitValue[]>(sampleUnitsDefault);
  const [sampleValues, setSampleValues] =
    useState<SampleValue[]>(sampleValuesDefault);

  const getInitialValues = async () => {
    const sample = await getSampleData();
    setSampleValues(sample);
  };

  const postNewValue = async (
    name: SampleResponseKeys | SampleUnitKeys,
    value: string,
  ) => {
    const response = await postSampleValue(name, value);
    setSampleValues(response);
  };

  const getValue = (name: SampleResponseKeys) => {
    const out = sampleValues.filter((v) => v.name == name);
    return out[0].value.val;
  };

  const [absorptionData, setAbsorptionData] = useState<AbsorptionDataSet[]>();

  const getAllAbsorptionData = async (elements: string[] = ["total"]) => {
    const massAbsorption = await getMassAbsorptionData(elements);
    const linearAbsorption = await getLinearAbsorptionData(elements);
    const totalAbsorption = await getTotalAbsorptionData(elements);

    const dataset: AbsorptionDataSet[] = [
      { data: massAbsorption, kind: "mass" },
      { data: linearAbsorption, kind: "linear" },
      { data: totalAbsorption, kind: "total" },
    ];

    setAbsorptionData(dataset);
  
  };

  return (
    <DataContext.Provider
      value={{
        sampleUnits: sampleUnits,
        sampleValues: sampleValues,
        setSampleUnits: setSampleUnits,
        getInitialValues: getInitialValues,
        postNewValue: postNewValue,
        getValue: getValue,
        absorptionData: absorptionData,
        getAllAbsorptionData: getAllAbsorptionData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
