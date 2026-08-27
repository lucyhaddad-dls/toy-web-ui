// new and improved sample context provider able to handle updating and such.

import type React from "react";
import type {
  SampleResponseKeys,
  SampleValue,
  UnitValue,
  SampleUnitKeys,
  AbsorptionType,
} from "../models/models";
import { useEffect, useState } from "react";
import {
  getLinearAbsorptionData,
  getMassAbsorptionData,
  getSampleData,
  getTotalAbsorptionData,
  postSampleValue,
} from "../models/queryFunctions";
import { DataContext } from "./DataContext";
import { nullAbsorptionValues, sampleUnitsDefault, sampleValuesDefault } from "../models/defaults";

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

    const [absorptionData, setAbsorptionData] = useState({"mass": nullAbsorptionValues,
                                                    "linear": nullAbsorptionValues,
                                                    "total": nullAbsorptionValues
                                                        })

    const getInitialAbsorption = async () => {
        const result = await getMassAbsorptionData(["total"]);
        setAbsorptionData({...absorptionData, mass: result})
    }
    


    const getAbsorption= async (elements:string[]=["total"], kind:AbsorptionType="mass") => {
        if (kind=="mass"){
            const massAbsorption = await getMassAbsorptionData(elements)
            setAbsorptionData({...absorptionData, mass: massAbsorption })
        }
        if (kind=="linear"){
            const linearAbsorption = await getLinearAbsorptionData(elements)
            setAbsorptionData({...absorptionData, linear: linearAbsorption})
        }

        if (kind=="total"){
            const totalAbsorption = await getTotalAbsorptionData(elements)
            setAbsorptionData({...absorptionData, total:totalAbsorption})
        }
    }


  return (
    <DataContext.Provider
      value={{
        sampleUnits: sampleUnits,
        sampleValues: sampleValues,
        setSampleUnits: setSampleUnits,
        getInitialValues: getInitialValues,
        getInitialAbsorption: getInitialAbsorption,
        postNewValue: postNewValue,
        getValue: getValue,
        absorptionData: absorptionData,
        setAbsorptionData: setAbsorptionData,
        getAbsorption: getAbsorption

      }}
    >
      {children}
    </DataContext.Provider>
  );
}
