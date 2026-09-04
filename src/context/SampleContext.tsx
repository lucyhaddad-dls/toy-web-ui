import { createContext } from "react"
import type {MultiSampleContextType } from "../models/models"
import { nullSampleValues} from "../models/defaults"

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