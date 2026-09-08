import type React from "react";
import { useState } from "react";
import type { SamplePhotoData, SampleResponse, SampleResponseKeys, SampleValueResponse  } from "../models/models";
import { calcDependencies, nullAbsorptionData, nullSampleValues } from "../models/defaults";
import { MultiSampleContext } from "./SampleContext";


export function MultiSampleProvider( props: {children:React.ReactNode}){
    const { children } = props;

    const [sampleList, setSampleList] = useState<SampleResponse[]>([])

     const [ focusedSample, setFocusedSample ] = useState<SampleResponse>({id:0, 
                                                                        values:nullSampleValues,
                                                                        name:"_"});


    const [sampleNames, setSampleNames] = useState<string[]>(sampleList.map(i => i.name))

    // sample list utils

    const getSampleNames = () => {
        const names = sampleList.map(i => i.name)
        setSampleNames(names)
    }
    
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
        setFocusedSample({...focusedSample, values:newValue})

        const newSampleList = sampleList.map(i => {
            if (i.name == focusedSample.name){
                return focusedSample
            }
            else {return i}
        })
        setSampleList(newSampleList);
      
        return () => {};
    }

    const addToSampleList = (values:SampleValueResponse[], name:string) => {

        const id = sampleList? sampleList.length: 0

     
        setSampleList([...sampleList, {id:id, values:values, name:name}])
    }

    const deleteFromSampleList = (name:string|undefined=undefined,   
        id:number|undefined = undefined) => {

        let newSamples = sampleList
            if (name != undefined){
                newSamples = sampleList.filter(i => i.name != name)
            }
            if (id != undefined){
                newSamples = sampleList.filter(i => i.id != id)
            }
        setSampleList(newSamples)

        }

    // calc utils

    const getAvailableCalcs = (name:string) => {

        const currentSample = sampleList.filter(i => i.name === name)[0]
        if (currentSample === undefined){return [""]}

        const nonNull = currentSample.values.filter(v =>
             v.value.val != null && v.value.val != undefined
            && v.value.val != "").map(v => v.name)

    const matches:string[] = []
    Object.keys(calcDependencies).map(key => {
        const tmpVals = calcDependencies[key as keyof typeof calcDependencies]
        let nested = false
        if (tmpVals.length != tmpVals.flat().length){
            nested = true
        }

       if (nested){
     
        tmpVals.map(arr => {
            const arr1 = arr as string[]
            const myFilter = arr1.every(i => nonNull.includes(
                i as SampleResponseKeys))
            if (myFilter){
                matches.push(key)
            }
        })
       }
       else {
        if (tmpVals.every(i => nonNull.includes(
            i as SampleResponseKeys))===true){
            matches.push(key)
        }
       }

    })

    return matches
    }
    
    // photo utils
    // could be defined on a per-sample basis instead.. 
    // but the calculation doesnt take long so i think this is fine for now.
    const [photoData, setPhotoData] = useState<SamplePhotoData>(nullAbsorptionData)

    return ( <MultiSampleContext.Provider
        value = {{sampleList: sampleList,
                setSampleList: setSampleList,
                addToSampleList: addToSampleList,
                deleteFromSampleList: deleteFromSampleList,
                focusedSample: focusedSample,
                setFocusedSample: setFocusedSample,
                sampleNames: sampleNames,
                getSampleNames: getSampleNames,
                getSingleValue: getSingleValue,
                setSingleValue: setSingleValue,
                getAvailableCalcs: getAvailableCalcs,
                photoData: photoData,
                setPhotoData: setPhotoData
        }} >
        {children}
        </MultiSampleContext.Provider> )
}