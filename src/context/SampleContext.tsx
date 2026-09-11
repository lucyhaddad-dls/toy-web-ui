import { createContext } from "react"
import type { MultiSampleContextType, SampleDataContextType} from "../models/models"
import { nullAbsorptionData, nullSampleValues } from "../models/defaults"

export const MultiSampleContext = createContext<MultiSampleContextType>
    ({
        sampleList: [],
        setSampleList: function (): void {
            throw new Error("Function not implemented.")
        },
        addToSampleList: function (): void {
            throw new Error("Function not implemented.")
        },
        deleteFromSampleList: function (): void {
            throw new Error("Function not implemented.")
        },
        focusedSample: { name: "_", values: nullSampleValues },
        setFocusedSample: function (): void {
            throw new Error("Function not implemented.")
        },
        sampleNames: [],
        getSampleNames: function (): void {
            throw new Error("Function not implemented.")
        },
        getSingleValue: function (): string {
            throw new Error("Function not implemented.")
        },
        setSingleValue: function (): () => void {
            throw new Error("Function not implemented.")
        },
        getAvailableCalcs: function (): string[] {
            throw new Error("Function not implemented.")
        },
        photoData: nullAbsorptionData,
        setPhotoData: function (): void {
            throw new Error("Function not implemented.")
        }
    })

export const SampleDataContext = createContext<SampleDataContextType>({
    sampleList: [],
    setSampleList: function (): void {
        throw new Error("Function not implemented.")
    },
    currentName: null,
    setCurrentName: function (): void {
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
    }
})