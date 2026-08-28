import { createContext } from "react"
import type { DataContextType } from "../models/models"

export const DataContext = createContext<DataContextType>({})