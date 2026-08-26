import { createContext } from "react";
import type { SampleValueGetter } from "../models/models";

export const SampleContext = createContext<SampleValueGetter>({});


export const DataContext = createContext({})