import type React from "react";
import { useState } from "react";
import { defaultAbsorptionValues, nullSampleValues } from "../models/defaults";
import type {
  AbsorptionDatasetType,
  SampleResponseKeys,
  SampleValueResponse,
} from "../models/models";
import { SampleContext } from "./SampleContext";

export function SampleProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [sampleValues, setSampleValues] =
    useState<SampleValueResponse[]>(nullSampleValues);

  const [absorptionData, setAbsorptionData] = useState<AbsorptionDatasetType>(
    defaultAbsorptionValues,
  );

  const getSingleValue = (name: SampleResponseKeys) => {
    const value = sampleValues.filter((v) => v.name == name);
    const val = value[0].value.val;
    if (val == null) {
      return "";
    } else {
      return val;
    }
  };

  const setSingleValue = (name:SampleResponseKeys, value:string) => {
    const newValues = sampleValues.map(itm => {
      if (itm.name == name){
        return {...itm, value: {...itm.value, val:value}};
      } else { return itm; }
    });
    setSampleValues(newValues);
    return () => {};
  }

  return (
    <SampleContext.Provider
      value={{
        values: sampleValues,
        setValues: setSampleValues,
        absorption: absorptionData,
        setAbsorption: setAbsorptionData,
        getValue: getSingleValue,
        setValue: setSingleValue,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
}
