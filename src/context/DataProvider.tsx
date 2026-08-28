import type React from "react";
import { DataContext } from "./DataContext";
import { useEffect, useState } from "react";
import { getSampleData } from "../models/queryFunctions";
import { type SampleValueResponse } from "../models/models";

export function DataProvider(props: { children: React.ReactNode }) {
    const { children } = props;

    const [sampleValues, setSampleValues] = useState<SampleValueResponse[]>([])

    useEffect(() => {
    let ignore = false;
    getSampleData().then(data => {
      if (!ignore) {
        setSampleValues(data);
      }
    });
        return () => {
        ignore = true;
        };
    }, []);


    return (<DataContext.Provider
    value = {{
        sampleValues: sampleValues,
        setSampleValues: setSampleValues
    }}
    > 
    {children} 
    </DataContext.Provider>);

}
