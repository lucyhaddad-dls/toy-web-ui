import { createContext, } from "react";
import { type SampleContextType, type SampleResponse } from "../models/models";
import { emptySampleValues, nullAbsorptionData } from "../models/defaults";


export const SampleContext = createContext<SampleContextType>({
  sampleList: [],
  addToSampleList: function (): void {
    throw new Error("Function not implemented.");
  },
  deleteFromSampleList: function (): void {
    throw new Error("Function not implemented.");
  },
  editSampleList: function (): void {
    throw new Error("Function not implemented.");
  },
  focusedSample: emptySampleValues,
  setFocusedSample: function (): void {
    throw new Error("Function not implemented.");
  },
  photoData: nullAbsorptionData,
  setPhotoData: function (): void {
    throw new Error("Function not implemented.");
  },
  getAvailableData: function (): string[] {
    throw new Error("Function not implemented.");
  },
  getSample: function (): SampleResponse {
    throw new Error("Function not implemented.");
  },
  editFocusedSample: function (): void {
    throw new Error("Function not implemented.");
  },
  replaceSampleValues: function (): void {
    throw new Error("Function not implemented.");
  }
})