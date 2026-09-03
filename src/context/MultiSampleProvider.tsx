import type React from "react";
import { createContext, useState } from "react";
import type { SampleResponse, SampleResponseKeys, SampleValueResponse  } from "../models/models";
import { nullSampleValues } from "../models/defaults";

export const MultiSampleContext = createContext({})

export function MultiSampleProvider( props: {children:React.ReactNode}){
    const { children } = props;

    const [sampleList, setSampleList] = useState<SampleResponse[]>([])
     // do want to add absorption data?

     const [ focusedSample, setFocusedSample ] = useState<SampleResponse>({id:0, 
                                                                            values:nullSampleValues});

    const getSingleValue = (name:SampleResponseKeys) => {
        const value = focusedSample.values.filter((v) => v.name == name);
        const out = value[0].value.val;
        if (out == null) { return "" }
        else { return out };
    };

    const setSingleValue = (name:SampleResponseKeys, value:string) => {
        const newValue = focusedSample.values.map(itm => {
            if (itm.name == name){
                return {...itm, value: {...itm.value, val:value}};
            }
            else {return itm;}

        })
        setFocusedSample({...focusedSample, values:newValue});
        return () => {};
    }

    const addToSampleList = (values:SampleValueResponse[]) => {

        const id = sampleList? sampleList.length: 0
     
        setSampleList([...sampleList, {id:id, values:values}])

    }
    

    return ( <MultiSampleContext.Provider
        value = {{sampleList: sampleList,
                setSampleList: setSampleList,
                addToSampleList: addToSampleList,
                focusedSample: focusedSample,
                getSingleValue: getSingleValue,
                setSingleValue: setSingleValue
        }} >
        {children}
        </MultiSampleContext.Provider> )
}