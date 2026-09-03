import { createContext } from "react"
import type { checkedAbsorptionValues, SampleContextType } from "../models/models"
import { defaultAbsorptionValues, nullSampleValues} from "../models/defaults"


export const SampleContext = createContext<SampleContextType>({
    values: nullSampleValues,
    setValues: function (): void {
        throw new Error("Function not implemented.")
    },
    absorption: defaultAbsorptionValues,
    setAbsorption: function (): void {
        throw new Error("Function not implemented.")
    },
    checkValues: function(): checkedAbsorptionValues {
        throw new Error("Funtion not implemented")
    },
    getValue: function (): string {
        throw new Error("Function not implemented.")
    },
    setValue: function (): () => void {
        throw new Error("Function not implemented.")
    }
})