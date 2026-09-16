import { createContext } from "react"
import type { SampleDataContextType, SampleResponse} from "../models/models"
import { nullAbsorptionData, nullSampleValues } from "../models/defaults"

export const SampleDataContext = createContext<SampleDataContextType>({
    sampleList: [],
    setSampleList: function (): void {
        throw new Error("Function not implemented.")
    },
    setSingleValue: function (): () => void {
        throw new Error("Function not implemented.")
    },
    addToSampleList: function (): void {
        throw new Error("Function not implemented.")
    },
    deleteFromSampleList: function (): void {
        throw new Error("Function not implemented.")
    },
    getSample: function (): SampleResponse {
        throw new Error("Function not implemented.")
    },
    focusedSample: {name:"", values:nullSampleValues},
    setFocusedSample: function (): void {
        throw new Error("Function not implemented.")
    },
    getAvailableData: function (): string[] {
            throw new Error("Function not implemented.")
        },
    photoData: nullAbsorptionData,
    setPhotoData: function (): void {
        throw new Error("Function not implemented.")
    },
})