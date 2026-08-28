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
"area" | "thickness" | "mass"

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
    name: SampleResponseKeys | SampleUnitKeys
}

interface ElementAbsorptionResponse {
  name: string
  y: string[]
}

export interface SampleAbsorptionResponse { 
  x: string[]
  xlabel: string
  ylabel: string
  y: ElementAbsorptionResponse
}