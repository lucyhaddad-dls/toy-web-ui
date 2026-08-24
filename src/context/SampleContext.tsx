import { useEffect, useState } from "react"
import { createContext } from "react"
import type { SampleInputValues } from "../models/models";

export const SampleContext = createContext({});

export const DataProvider = ({children}) => {

    // list of "name", "value"{val, dtype}
    const [sampleValues, setSampleValues] = useState<SampleInputValues>([])

    // true when calculations on sample should be done.
    const [dataReady, setDataReady] = useState<boolean>(true)

    const fetchSampleValues = async () => {
        const response = await fetch("/api/input")
        const data = await response.json()

        // data is a list of "name", "value"{val, dtype}
        data.map(val => {
            const name_tmp:string = val.name
            sampleValues[name_tmp] = val.value.val
        })
        
    }

    useEffect(() => {
        fetchSampleValues()
    }, [] )

 
    return <SampleContext.Provider value = {{ sampleValues: sampleValues,
                                              setSampleValues: setSampleValues,
                                              fetchSampleValues: fetchSampleValues,
                                              dataReady: dataReady,
                                              setDataReady: setDataReady
                                               }}>
        { children }
    </SampleContext.Provider>

} 