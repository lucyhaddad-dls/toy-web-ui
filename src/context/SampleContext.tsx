// make context to handle sample values:

import React, { createContext, useState } from "react";
import { type AbsorptionKeys, type SampleKeys, type SampleMassResponse, 
    type SampleValueGetter, type SampleValues,type SampleUnit} from "../models/models";
import { useQuery } from "@tanstack/react-query";
import { getMassAbsorption, getSampleData } from "../models/queryFunctions";
import { AxiosError } from "axios";

export const SampleContext = createContext<SampleValueGetter>({});

export function SampleProvider(props: {children: React.ReactNode}) {
    const { children } = props;

    // should probably remove units from this and add to SampleUnit interface..

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

    const unitOptions:SampleUnit[] = [{value: "g", name:"mass_unit", options:["kg", "g", "mg", "ug"]},
                        {value: "cm", name:"length_unit", options:["m", "cm", "mm", "um"]},
                        {value: "gev", name:"energy_unit", options:["gev", "ev"]}]

    const [absorptionValues, setAbsorptionValues] = useState<SampleMassResponse>({xlabel: null,
                                                                                ylabel: null,
                                                                                x: null,
                                                                                y: null})

    const [currentAbsorptionKind, setCurrentAbsorptionKind] = useState<AbsorptionKeys>("mass")

    const getValues = (name:SampleKeys) => {
        return initialSampleValues[name]
    }

    const initialKeys:SampleKeys[] = Object.keys(initialSampleValues).map((i) => i as SampleKeys)


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
            keyList: initialKeys,
            getAbsorptionValues: getAbsorptionValues,
            absorptionValues: absorptionValues,
            unitOptions: unitOptions,
            currentAbsorptionKind: currentAbsorptionKind
        }}> 
                    {children}
                </SampleContext.Provider>)
    }

    

