import type React from "react";

export type MassUnits = "kg" | "g" | "mg" | "ug"
export type LengthUnits = "m" | "cm" | "mm" | "um"
export type EnergyUnits = "gev" | "kev" | "ev"

export const sampleKeys: SampleResponseKeys[] = [
  "formula",
  "absorber",
  "edge",
  "density",
  "area",
  "thickness",
  "mass"];

  export const unitKeys: SampleUnitKeys[] = [
    "mass_unit",
    "length_unit",
    "energy_unit"
  ]

export type AbsorptionType = "mass" | "linear" | "total"

export type SampleResponseKeys = "formula" | "absorber" | "edge" | "density" |
"area" |  "mu_total" | "thickness" | "mass"

export type SampleUnitKeys = "mass_unit" | "length_unit" | "energy_unit"

export interface UnitValue {
    name: SampleUnitKeys
    value: MassUnits | LengthUnits | EnergyUnits
    options: MassUnits[] | LengthUnits[] | EnergyUnits[]
}

interface SampleValue {
    val: string | null
    dtype: "str" | "float" | "int"
}

export interface SampleValueResponse {
    value: SampleValue
    name: SampleResponseKeys 
}

export interface SampleResponse {
  id: number
  name: string
  values: SampleValueResponse[]
}

export interface ElementAbsorptionResponse {
  name: string
  y: string
}

export interface SampleAbsorptionResponse { 
  x: string
  xlabel: string
  ylabel: string
  y: ElementAbsorptionResponse[]
}


export interface MultiSampleContextType{
  sampleList: SampleResponse[]
  setSampleList: React.Dispatch<React.SetStateAction<SampleResponse[]>>
  addToSampleList: (values: SampleValueResponse[], name: string) => void
  focusedSample: SampleResponse
  sampleNames: string[]
  getSampleNames: () => void
  getSingleValue: (name: SampleResponseKeys) => string
  setSingleValue: (name: SampleResponseKeys, value: string) => () => void
}

export interface SampleMassRatioType {
  formula: string
  ratio: number
}
