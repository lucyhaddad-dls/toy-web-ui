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

export interface SampleAbsorptionErrorResponse {
  error: string
}

export interface AbsorptionDatasetType {
  mass: null | SampleAbsorptionResponse
  linear: null | SampleAbsorptionResponse
  total: null | SampleAbsorptionResponse
}

export interface SampleContextType {
  values: SampleValueResponse[]
  setValues: React.Dispatch<React.SetStateAction<SampleValueResponse[]>>
  absorption: AbsorptionDatasetType
  setAbsorption: React.Dispatch<React.SetStateAction<AbsorptionDatasetType>>
  checkValues: () => void
  getValue: (name: SampleResponseKeys) => string
  setValue: (name: SampleResponseKeys, value: string) => () => void
}

export interface SampleMassRatioType {
  ratio: number
  formula: string
  index: number
}

export interface NewSampleMassRatioType {
  formula: string
  ratio: number
}