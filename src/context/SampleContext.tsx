import { createContext } from "react"
import type { SampleContextType } from "../models/models"


export const SampleContext = createContext<SampleContextType>({
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
    },
    setValue: function (): () => void {
        throw new Error("Function not implemented.")
    }
})