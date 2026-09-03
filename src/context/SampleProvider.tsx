import type React from "react";
import { useState } from "react";
import { defaultAbsorptionValues, nullSampleValues } from "../models/defaults";
import {
  sampleKeys,
  type AbsorptionDatasetType,
  type checkedAbsorptionValues,
  type SampleResponseKeys,
  type SampleValueResponse,
} from "../models/models";
import { SampleContext } from "./SampleContext";
import { getAbsorptionData } from "../models/queryFunctions";



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

  const checkSampleValues = () => {
    let nonNull:string[] = []

    sampleKeys.map(key => {
      const tmp:string|null = sampleValues.filter(v => v.name == key)[0].value.val
      if (tmp != null){
        nonNull = [...nonNull, key]
        }
      
    })
    const massAbsSuccess = ["formula", "absorber", "edge"].every(i => nonNull.includes(i));
    const linearAbsSuccess = ["formula", "absorber", "edge", "density"].every(i => nonNull.includes(i));
    const totalAbsSuccess =  ["formula", "absorber", "edge",
                   "density", "thickness"].every(i => nonNull.includes(i));

    const out:checkedAbsorptionValues = {"mass": massAbsSuccess, "linear": linearAbsSuccess, "total": totalAbsSuccess}
    getAbsorptionValues(out)
    return out
  }

  const getAbsorptionValues = (dataReady:{"mass":boolean,
                                          "linear":boolean,
                                            "total":boolean}) => {
        if (dataReady.mass == true){
          getAbsorptionData("mass").then(data =>
             setAbsorptionData({...absorptionData, mass:data}));
        }
        if (dataReady.linear == true){
          getAbsorptionData("linear").then(data =>
             setAbsorptionData({...absorptionData, linear:data}));
        }
        if (dataReady.total == true){
          getAbsorptionData("total").then(data =>
             setAbsorptionData({...absorptionData, total:data}));
        }
  }

  return (
    <SampleContext.Provider
      value={{
        values: sampleValues,
        setValues: setSampleValues,
        absorption: absorptionData,
        setAbsorption: setAbsorptionData,
        checkValues: checkSampleValues,
        getValue: getSingleValue,
        setValue: setSingleValue,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
}
