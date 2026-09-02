import { createContext, type SetStateAction} from "react"
import type { AbsorptionDatasetType, DataContextType, SampleContextType, SampleResponseKeys, SampleValueResponse, UnitValue } from "../models/models"

export const DataContext = createContext<DataContextType>({
    sampleValues: [],
    setSampleValues: function (): void {
        throw new Error("Function not implemented.")
    },
    sampleUnits: [],
    setSampleUnits: function (): void {
        throw new Error("Function not implemented.")
    },
    getSingleValue: function (): string | null {
        throw new Error("Function not implemented.")
    },
    getUnit: function (): UnitValue {
        throw new Error("Function not implemented.")
    },
    allAbsorptionData: undefined,
    setAllAbsorptionData: function (): void {
        throw new Error("Function not implemented.")
    }
})

export const SampleContext = createContext<SampleContextType>({
    formula: "",
    setFormula: function (): void {
        throw new Error("Function not implemented.")
    },
    values: [],
    setValues: function (): void {
        throw new Error("Function not implemented.")
    },
    absorption: undefined,
    setAbsorption: function (): void {
        throw new Error("Function not implemented.")
    },
    getValue: function (): string {
        throw new Error("Function not implemented.")
    }
})