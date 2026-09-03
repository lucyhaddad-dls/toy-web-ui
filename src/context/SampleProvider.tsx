import type React from "react";
import { useState } from "react";
import { defaultAbsorptionValues, defaultCheckedAbsorptionValues, nullSampleValues } from "../models/defaults";
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

  const [absoprtionAvailable, setAbsorptionAvailable] = useState<checkedAbsorptionValues>(defaultCheckedAbsorptionValues)

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
      if (tmp != null && tmp != "" && tmp != "None"){
        nonNull = [...nonNull, key]
        }
      
    })
    const massAbsSuccess = ["formula", "absorber", "edge"].every(i => nonNull.includes(i));
    const linearAbsSuccess = ["formula", "absorber", "edge", "density"].every(i => nonNull.includes(i));
    const totalAbsSuccess =  ["formula", "absorber", "edge",
                   "density", "thickness"].every(i => nonNull.includes(i));

    const out:checkedAbsorptionValues = {"mass": massAbsSuccess, 
                                        "linear": linearAbsSuccess, 
                                        "total": totalAbsSuccess}
    setAbsorptionAvailable(out)
  }

  const getAbsorptionValues = () => {

    if (absoprtionAvailable.mass == true){
          getAbsorptionData("mass").then(data =>
             setAbsorptionData({...absorptionData, mass:data}));
        };
        if (absoprtionAvailable.linear == true){
          getAbsorptionData("linear").then(data =>
          {const err = Object.keys(data).filter(k => k=="error")
            if (err.length > 1){console.log("ERR (linear")}

             setAbsorptionData({...absorptionData, linear:data})
          });
        };
        if (absoprtionAvailable.total == true){
          getAbsorptionData("total").then(data =>
             setAbsorptionData({...absorptionData, total:data}));
        };
  }

  return (
    <SampleContext.Provider
      value={{
        values: sampleValues,
        setValues: setSampleValues,
        absorption: absorptionData,
        availableAbs: absoprtionAvailable,
        setAbsorption: setAbsorptionData,
        getAbsorption: getAbsorptionValues,
        checkValues: checkSampleValues,
        getValue: getSingleValue,
        setValue: setSingleValue,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
}
