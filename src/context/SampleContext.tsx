// having a go at re-writing sample context for
// using sample builder to make inputs for the api.

import type React from "react";
import { useState } from "react";
import { defaultAbsorptionValues, nullSampleValues } from "../models/defaults";
import type { AbsorptionDatasetType, SampleResponseKeys, SampleValueResponse } from "../models/models";
import { SampleContext } from "./DataContext";

export function SampleProvider( props: {children: React.ReactNode}) {
    const { children } = props;

    const [sampleFormula, setSampleFormula] = useState<string>("")

    const [sampleValues, setSampleValues] = useState<SampleValueResponse[]>(nullSampleValues)

    const [absorptionData, setAbsorptionData] = useState<AbsorptionDatasetType>(defaultAbsorptionValues)

    const getSingleValue = (name: SampleResponseKeys) => {
        const value = sampleValues.filter((v) => v.name == name);
        const val = value[0].value.val
        if (val == null){
            return ""
        }
        else {
            return val
        }
    }

    return (<SampleContext.Provider
        value = {{
            formula: sampleFormula,
            setFormula: setSampleFormula,
            values: sampleValues,
            setValues: setSampleValues,
            absorption: absorptionData,
            setAbsorption: setAbsorptionData,
            getValue: getSingleValue
        }}>
        { children }
    </SampleContext.Provider>)
}