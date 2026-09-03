import { createContext } from "react"
import type { checkedAbsorptionValues, SampleContextType } from "../models/models"
import { defaultAbsorptionValues, defaultCheckedAbsorptionValues, nullSampleValues} from "../models/defaults"

export const MultiSampleContext = createContext({})

export const SampleContext = createContext<SampleContextType>({
    values: nullSampleValues,
    setValues: function (): void {
        throw new Error("Function not implemented.")
    },
    absorption: defaultAbsorptionValues,
    availableAbs: defaultCheckedAbsorptionValues,
    setAbsorption: function (): void {
        throw new Error("Function not implemented.")
    },
    getAbsorption: function () : void {
        throw new Error("Funtion not implemented")
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