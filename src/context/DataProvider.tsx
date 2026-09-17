import { useState } from "react";
import {
  calcDependencies,
  emptySampleValues,
  exampleSampleValues,
  nullAbsorptionData,
  nullSampleValues,
} from "../models/defaults";
import type {
  SamplePhotoData,
  SampleResponse,
  SampleResponseKeys,
} from "../models/models";
import { SampleContext } from "./SampleContext";

export function DataProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [sampleList, setSampleList] = useState<SampleResponse[]>([
    { name: "example data", values: exampleSampleValues },
    { name: "empty sample", values: nullSampleValues },
  ]);

  const [focusedSample, setFocusedSample] =
    useState<SampleResponse>(emptySampleValues);

  const getSample = (name: string | null) => {
    if (name == null) {
      return emptySampleValues;
    }

    let currentSample = sampleList.find((i) => i.name == name);
    if (currentSample == undefined) {
      // add to sample list?
      currentSample = { name: name, values: nullSampleValues };
    }

    return currentSample;
  };

  const addToSampleList = (sample: SampleResponse) => {
    setSampleList([...sampleList, sample]);
  };

  const deleteFromSampleList = (name: string) => {
    const newSamples = sampleList.filter((i) => i.name != name);
    setSampleList(newSamples);
  };

  const editSampleList = (
    sampleName: string,
    valName: SampleResponseKeys,
    newValue: string,
  ) => {
    const currentSample = getSample(sampleName);
    const newSample = currentSample.values.map((i) => {
      if (i.name == valName) {
        return { ...i, value: newValue };
      } else {
        return i;
      }
    });

    const newList = sampleList.map((i) => {
      if (i.name == sampleName) {
        return { ...i, values: newSample };
      } else {
        return i;
      }
    });
    setSampleList(newList);
  };

  const [photoData, setPhotoData] =
    useState<SamplePhotoData>(nullAbsorptionData);

  const getAvailableData = (sampleName: string) => {
    const currentData = getSample(sampleName);
    const nonNull = currentData.values
      .filter((v) => v.value != null && v.value != undefined && v.value != "")
      .map((v) => v.name);

    const matches: string[] = [];

    Object.keys(calcDependencies).map((key) => {
      const tmpVals = calcDependencies[key as keyof typeof calcDependencies];
      let nested = false;
      if (tmpVals.length != tmpVals.flat().length) {
        nested = true;
      }
      if (nested) {
        tmpVals.map((arr) => {
          const arr1 = arr as string[];
          const myFilter = arr1.every((i) =>
            nonNull.includes(i as SampleResponseKeys),
          );
          if (myFilter) {
            matches.push(key);
          }
        });
      } else {
        if (
          tmpVals.every((i) => nonNull.includes(i as SampleResponseKeys)) ===
          true
        ) {
          matches.push(key);
        }
      }
    });

    return matches;
  };

  return (
    <SampleContext.Provider
      value={{
        sampleList: sampleList,
        addToSampleList: addToSampleList,
        deleteFromSampleList: deleteFromSampleList,
        editSampleList: editSampleList,

        getSample: getSample,

        focusedSample: focusedSample,
        setFocusedSample: setFocusedSample,

        photoData: photoData,
        setPhotoData: setPhotoData,
        getAvailableData: getAvailableData,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
}
