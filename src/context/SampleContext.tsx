import { createContext } from "react"
import type { checkedAbsorptionValues, MultiSampleContextType, SampleContextType} from "../models/models"
import { defaultAbsorptionValues, defaultCheckedAbsorptionValues, nullSampleValues} from "../models/defaults"

export const MultiSampleContext = createContext<MultiSampleContextType>
    ({
        sampleList: [],
        setSampleList: function (): void {
            throw new Error("Function not implemented.")
        },
        addToSampleList: function (): void {
            throw new Error("Function not implemented.")
        },
        focusedSample: {id:0, name:"_", values:nullSampleValues},
        getSingleValue: function (): string {
            throw new Error("Function not implemented.")
        },
        setSingleValue: function (): () => void {
            throw new Error("Function not implemented.")
        }
    })

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