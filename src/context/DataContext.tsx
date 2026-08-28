import { createContext} from "react"
import type { DataContextType, UnitValue } from "../models/models"

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