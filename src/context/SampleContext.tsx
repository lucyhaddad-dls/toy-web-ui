// make context to handle sample values:

import React, { createContext, useState } from "react";
import { type AbsorptionKeys, type SampleKeys, type SampleMassResponse, type SampleValueGetter, type SampleValues } from "../models/models";
import { useQuery } from "@tanstack/react-query";
import { getMassAbsorption, getSampleData } from "../models/queryFunctions";
import { AxiosError } from "axios";

export const SampleContext = createContext<SampleValueGetter>({});

export function SampleProvider(props: {children: React.ReactNode}) {
    const { children } = props;

    const initialSampleValues = {formula: {value: null, isUnit: false, isCalculated:false},
        absorber: {value: null, isUnit: false, isCalculated: false},
        edge: {value: null, isUnit: false, isCalculated: false},
        mu_total: {value: null, isUnit: false, isCalculated: false},
        density: {value: null, isUnit: false, isCalculated: false},
        area: {value: null, isUnit: false, isCalculated: false},

        mass_unit: {value: "g", isUnit: true, isCalculated: false},
        length_unit: {value: "cm", isUnit: true, isCalculated: false},
        energy_unit: {value: "gev", isUnit: true, isCalculated: false},

        mass: {value: null, isUnit: false, isCalculated: true},
        thickness: {value: null, isUnit: false, isCalculated: true}} satisfies SampleValues

    const [absorptionValues, setAbsorptionValues] = useState<SampleMassResponse>({xlabel: null,
                                                                                ylabel: null,
                                                                                x: null,
                                                                                y: null})

    const [currentAbsorptionKind, setCurrentAbsorptionKind] = useState<AbsorptionKeys>("mass")

    const getValues = (name:SampleKeys) => {
        if (initialSampleValues[name].value != null){
            return (initialSampleValues[name].value)}
        else{return null}}

    const getAbsorptionValues = async(kind:AbsorptionKeys) => {

        // todo: add conditionals here to avoid over-posting data.
        setCurrentAbsorptionKind(kind)
        const data = await getMassAbsorption()
        setAbsorptionValues(data)
    }
   

    // giving tanstack query a go
    const query = useQuery({
        queryKey: ["sample"],
        queryFn: getSampleData,
        retry: (failureCount, error: AxiosError) => {
            if ("status" in error && (error.status == 401 || error.status == 403)) {
                return false;
            }
            return failureCount < 2;
        },
    });

    if (query.data) {
        Object.entries(query.data).map((val) => 
        {   const name_tmp:SampleKeys = val[1].name
            const value_tmp = val[1].value.val
            if (value_tmp != null){
            initialSampleValues[name_tmp].value = value_tmp}
        }
    )
       
        }

        return (<SampleContext.Provider value={{
            getValues: getValues,
            keyList: Object.keys(initialSampleValues),
            getAbsorptionValues: getAbsorptionValues,
            absorptionValues: absorptionValues,
        }}> 
                    {children}
                </SampleContext.Provider>)
    }

    

