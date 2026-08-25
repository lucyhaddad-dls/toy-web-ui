// make context to handle sample values:

import React, { createContext } from "react";
import { type SampleValueGetter, type SampleKeys } from "../models/models";
import { useQuery } from "@tanstack/react-query";
import { getSampleData } from "../models/queryFunctions";
import { AxiosError } from "axios";


export const SampleContext = createContext<SampleValueGetter>({});

export function SampleProvider(props: {children: React.ReactNode}) {
    const { children } = props;

    const initial = {formula: {value: null, isUnit: false, isCalculated:false},
    absorber: {value: null, isUnit: false, isCalculated: false},
    edge: {value: null, isUnit: false, isCalculated: false},
    mu_total: {value: null, isUnit: false, isCalculated: false},
    density: {value: null, isUnit: false, isCalculated: false},
    area: {value: null, isUnit: false, isCalculated: false},

    mass_unit: {value: "g", isUnit: true, isCalculated: false},
    length_unit: {value: "cm", isUnit: true, isCalculated: false},
    energy_unit: {value: "gev", isUnit: true, isCalculated: false},

    mass: {value: null, isUnit: false, isCalculated: true},
    thickness: {value: null, isUnit: false, isCalculated: true}}

      const getValue = (name:SampleKeys) => {
        if (initial[name].value != null){
            return (initial[name].value)}
        else{return null}}

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
            initial[name_tmp].value = value_tmp}
        }
    )
       
        }

        return (<SampleContext.Provider value={{
            getValue: getValue,
            keyList: Object.keys(initial)
        }}> 
                    {children}
                </SampleContext.Provider>)
    }

    

