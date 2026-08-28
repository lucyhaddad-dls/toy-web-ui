/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, type SetStateAction } from "react"
import type { DataContextType, SampleResponseKeys, SampleUnitKeys, SampleValueResponse, TotalAbsorptionDataset, UnitValue } from "../models/models"

export const DataContext = createContext<DataContextType>({
    sampleValues: [],
    setSampleValues: function (value: SetStateAction<SampleValueResponse[]>): void {
        throw new Error("Function not implemented.")
    },
    sampleUnits: [],
    setSampleUnits: function (value: SetStateAction<UnitValue[]>): void {
        throw new Error("Function not implemented.")
    },
    getSingleValue: function (name: SampleResponseKeys): string | null {
        throw new Error("Function not implemented.")
    },
    getUnit: function (name: SampleUnitKeys): UnitValue {
        throw new Error("Function not implemented.")
    },
    allAbsorptionData: undefined,
    setAllAbsorptionData: function (value: SetStateAction<TotalAbsorptionDataset>): void {
        throw new Error("Function not implemented.")
    }
})