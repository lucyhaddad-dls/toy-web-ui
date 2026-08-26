// new and improved sample context provider able to handle updating and such.

import type React from "react";
import type { AbsorptionDataSet, SampleResponseKeys, SampleValue, UnitValue,
    SampleUnitKeys } from "../models/newModels";
import { useState } from "react";
import { getLinearAbsorptionData, getMassAbsorptionData, getSampleData, getTotalAbsorptionData, postSampleValue } from "../models/newQueryFunctions";
import { DataContext } from "./SampleProviderContext";


export function SampleProvider(props: {children: React.ReactNode}){
    const { children } = props

    const sampleUnits:UnitValue[] = [ {name:"mass_unit", value:"g",
                         options: ["kg", "g", "mg", "ug"]},
                        {name: "length_unit", value:"g", 
                         options: ["m", "cm", "mm", "um"]},
                        {name: "energy_unit", value: "gev",
                         options: ["gev", "ev"]} ]

    const [sampleValues, setSampleValues] = useState<SampleValue[]>([])

    const getInitialValues = async() => {
        const sample = await getSampleData()
        setSampleValues(sample)
    }

    const postNewValue = async(name:SampleResponseKeys | SampleUnitKeys,
                            value: string) => {
        const response = await(postSampleValue(name, value))
        setSampleValues(response)
     
        console.log("new values are: ", sampleValues)
    }

    const [absorptionData, setAbsorptionData] = useState<AbsorptionDataSet[]>()

    const testGetAllAbsorption = async(elements:string[]=["total"]) =>
    {
        const massAbsorption = await getMassAbsorptionData(elements)

        // need check for server error (500)
        const linearAbsorption = await getLinearAbsorptionData(elements)
        
        // need check for server error (500)
        const totalAbsorption = await getTotalAbsorptionData(elements)

        const dataset:AbsorptionDataSet[] = [{data:massAbsorption, kind:"mass"},
            {data:linearAbsorption, kind:"linear"},
            {data:totalAbsorption, kind:"total"}]

      setAbsorptionData(dataset)
    }

    
    return (
        <DataContext.Provider
         value = {{
            sampleUnits: sampleUnits,
            sampleValues: sampleValues,
            getInitialValues: getInitialValues,
            postNewValue: postNewValue,
            absorptionData: absorptionData,
            testGetAllAbsorption: testGetAllAbsorption
         }}>
            { children }
        </DataContext.Provider>
    )

}