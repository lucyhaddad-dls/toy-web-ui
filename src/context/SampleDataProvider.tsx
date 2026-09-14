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
    

    const getSample = (name:string) => {
        let currentSample = sampleList.find(i => i.name == name)
        if (currentSample == undefined){
            currentSample = {name: name, 
                values: nullSampleValues}
        }

        return currentSample
    }

    const setSingleValue = (name:SampleResponseKeys, value:string,
        sampleId:string
     ) => {

        const currentSample = getSample(sampleId)
        const newValue = currentSample.values.map(itm => {
            if (itm.name == name){
                return {...itm, value: {...itm.value, val:value}};
            }
            else {return itm}
        })

        const newList = sampleList.map(i => {
            if (i.name == sampleId){
                return {...i, values: newValue}
            }
            else { return i }
        });

        setSampleList(newList);
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
            getSample: getSample,
            setSingleValue: setSingleValue,
            addToSampleList: addToSampleList,
            deleteFromSampleList: deleteFromSampleList
     }}>
        {children}
    </SampleDataContext.Provider>)
}
