import type React from "react";
import { useState } from "react";
import type { SampleResponse, SampleResponseKeys, SampleValueResponse } from "../models/models";
import { exampleSampleValues, nullSampleValues } from "../models/defaults";
import { SampleDataContext } from "./SampleContext";


export function SampleDataProvider( props: {children:React.ReactNode}){
    const { children } = props;

    
    const [sampleList, setSampleList] = useState<SampleResponse[]>([
        {name:"example data", values:exampleSampleValues},
        {name:"empty sample", values:nullSampleValues}])
    
    const [currentName, setCurrentName] = useState<string|null>(null)

    const [getCurrentSample,] = useState(sampleList.filter(i => i.name == currentName)[0])

    const setSingleValue = (name:SampleResponseKeys, value:string ) => {
        if (currentName != null){
        const newValue = getCurrentSample.values.map(itm => {
            if (itm.name == name){
                return {...itm, value: {...itm.value, val:value}};
            }
            else {return itm}
        })

        const newList = sampleList.map(i => {
            if (i.name == currentName){
                return {...i, values: newValue}
            }
            else { return i }
        });
      
        setSampleList(newList)};

        return () => {};
    }

    const addToSampleList = (values:SampleValueResponse[], name: string) => {
        setSampleList([...sampleList, {name:name, values:values}])
    }

    const deleteFromSampleList = (name:string) => {
        
        const newSamples = sampleList.filter(i => i.name != name)
        setSampleList(newSamples)
    }


    return (<SampleDataContext.Provider
    value = {{ 
            sampleList:sampleList,
            setSampleList:setSampleList,
            currentName: currentName,
            setCurrentName: setCurrentName,
            setSingleValue: setSingleValue,
            addToSampleList: addToSampleList,
            deleteFromSampleList: deleteFromSampleList
     }}>
        {children}
    </SampleDataContext.Provider>)
}
