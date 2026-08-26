import { createContext } from "react";
import type { SampleProviderData } from "../models/models";

export const DataContext = createContext<SampleProviderData>({});
