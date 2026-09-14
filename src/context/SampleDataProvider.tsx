import type React from "react";
import { useState } from "react";
import type { SampleResponse, SampleResponseKeys, SampleValueResponse } from "../models/models";
import { exampleSampleValues, nullSampleValues } from "../models/defaults";
import { SampleDataContext } from "./SampleContext";
import { postFocusedSample } from "../models/queryFunctions";


export function SampleDataProvider( props: {children:React.ReactNode}){
    const { children } = props;

    
    const [sampleList, setSampleList] = useState<SampleResponse[]>([
        {name:"example data", values:exampleSampleValues},
        {name:"empty sample", values:nullSampleValues}])
    
    const [currentName, _setCurrentName] = useState<string|null>(null)
    
    const setCurrentName = (name:string) => {
        _setCurrentName(name)

    }

    const getCurrentSample = () => {
        // add to the context!
        let currentSample = sampleList.find(i => i.name == currentName)
        if (currentSample == undefined){
            currentSample = {name: currentName!=null? currentName : "", 
                values: nullSampleValues}
        }
        return currentSample
    }

    const setSingleValue = (name:SampleResponseKeys, value:string ) => {

        if (currentName != null){

        const currentSample = getCurrentSample()
        const newValue = currentSample.values.map(itm => {
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
        postFocusedSample(currentSample)
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
