import type React from "react";
import { DataContext } from "./DataContext";
import { useEffect, useState } from "react";
import { getAbsorptionData, getSampleData } from "../models/queryFunctions";
import { type SampleResponseKeys, type SampleUnitKeys,
     type SampleValueResponse, type TotalAbsorptionDataset, type UnitValue } from "../models/models";
import { defaultSampleUnits, nullAbsorptionValues, nullSampleValues } from "../models/defaults";
import { all } from "axios";

export function DataProvider(props: { children: React.ReactNode }) {
    const { children } = props;

    const [sampleValues, setSampleValues] = useState<SampleValueResponse[]>(nullSampleValues)

    const [sampleUnits, setSampleUnits] = useState<UnitValue[]>(defaultSampleUnits)


    const [allAbsorptionData, setAllAbsorptionData] = useState<TotalAbsorptionDataset>
    (nullAbsorptionValues)

    useEffect(() => {
    let ignore = false;
    getSampleData().then(data => {
      if (!ignore) { setSampleValues(data); }
        });
        return () => { ignore = true; }
    }, []);

    useEffect(() => {
    let ignore = false;
    getAbsorptionData("mass").then(data => {
      if (!ignore) { 
        setAllAbsorptionData({mass: data, total: undefined, linear: undefined})
      }
        });
        return () => { ignore = true; }
    }, []);

 
    const getSingleValue = (name:SampleResponseKeys) => {
       
        const value = sampleValues.filter((v) => v.name == name);
        const val = value[0].value.val
        if (val == null){
            return ""
        }
        else {
        return value[0].value.val
            }    
    }

    const getUnit = (name:SampleUnitKeys) => {
        const unit = sampleUnits.filter((v) => v.name == name)

        return unit[0]
    }
    // add a getValueAndUnits function?


    return (<DataContext.Provider
    value = {{
        sampleValues: sampleValues,
        setSampleValues: setSampleValues,
        sampleUnits: sampleUnits,
        setSampleUnits: setSampleUnits,
        getSingleValue: getSingleValue,
        getUnit: getUnit,
        allAbsorptionData: allAbsorptionData,
        setAllAbsorptionData: setAllAbsorptionData

    }}
    > 
    {children} 
    </DataContext.Provider>);

}
