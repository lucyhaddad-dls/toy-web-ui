import type React from "react";
import { useState } from "react";
import type {
  SamplePhotoData,
  SampleResponse,
  SampleResponseKeys,
  SampleValueResponse,
} from "../models/models";
import {
  calcDependencies,
  exampleSampleValues,
  nullAbsorptionData,
  nullSampleValues,
} from "../models/defaults";
import { SampleDataContext } from "./SampleContext";
import { postFocusedSample } from "../models/queryFunctions";

export function SampleDataProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [sampleList, setSampleList] = useState<SampleResponse[]>([
    { name: "example data", values: exampleSampleValues },
    { name: "empty sample", values: nullSampleValues },
  ]);

  const getSample = (name: string) => {
    let currentSample = sampleList.find((i) => i.name == name);
    if (currentSample == undefined) {
      currentSample = { name: name, values: nullSampleValues };
    }

    return currentSample;
  };

  const setSingleValue = (
    name: SampleResponseKeys,
    value: string,
    sampleId: string,
  ) => {
    const currentSample = getSample(sampleId);
    const newValue = currentSample.values.map((itm) => {
      if (itm.name == name) {
        return { ...itm, value: value };
      } else {
        return itm;
      }
    });

    const newList = sampleList.map((i) => {
      if (i.name == sampleId) {
        return { ...i, values: newValue };
      } else {
        return i;
      }
    });

    setSampleList(newList);
    return () => {};
  };

  const addToSampleList = (values: SampleValueResponse[], name: string) => {
    setSampleList([...sampleList, { name: name, values: values }]);
  };

  const deleteFromSampleList = (name: string) => {
    const newSamples = sampleList.filter((i) => i.name != name);
    setSampleList(newSamples);
  };

  // make a member of the sampleList the focusedSample when absorption
  // data requested:
  const [focusedSample, _setFocusedSample] = useState<SampleResponse>(
    sampleList[0],
  );
  // set it by default to be the first example sample.
  const setFocusedSample = (values: SampleResponse) => {
    _setFocusedSample(values);
    postFocusedSample(focusedSample);
  };

  const [photoData, setPhotoData] =
    useState<SamplePhotoData>(nullAbsorptionData);

  const getAvailableData = (sampleId: string) => {
    const currentData = getSample(sampleId);
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
    <SampleDataContext.Provider
      value={{
        sampleList: sampleList,
        setSampleList: setSampleList,
        getSample: getSample,
        setSingleValue: setSingleValue,
        addToSampleList: addToSampleList,
        deleteFromSampleList: deleteFromSampleList,
        focusedSample: focusedSample,
        setFocusedSample: setFocusedSample,
        getAvailableData: getAvailableData,
        photoData: photoData,
        setPhotoData: setPhotoData,
      }}
    >
      {children}
    </SampleDataContext.Provider>
  );
}
