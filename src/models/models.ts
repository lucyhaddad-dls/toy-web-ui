
export type SampleKeys = "formula" | "absorber" | "edge" | "mu_total" | "density" | "area" |
        "mass_unit" | "energy_unit" | "length_unit" | "mass" | "thickness"

export type AbsorptionKeys = "mass" | "linear" | "total"

export type MassUnits = "kg" | "g" | "mg" | "ug"
export type LengthUnits = "m" | "cm" | "mm" | "um"
export type EnergyUnits = "gev" | "ev"

export interface SampleUnit {
    name: "energy_unit" | "length_unit" | "mass_unit"
    value: MassUnits | LengthUnits | EnergyUnits
    options: MassUnits[] | LengthUnits[] | EnergyUnits[]
}

export interface SampleInput {
    value: string | null
    isUnit: boolean
    isCalculated: boolean
}

export interface SampleValues {

    formula: SampleInput
    absorber: SampleInput
    edge: SampleInput
    mu_total: SampleInput
    density: SampleInput
    area: SampleInput

    // isUnit = true
    mass_unit: SampleInput
    length_unit: SampleInput
    energy_unit: SampleInput

    // isCalculated = true
    mass: SampleInput
    thickness: SampleInput
}

export interface SingleSampleValue {
    name: SampleKeys
    value: {val: string | null, dtype: "float" | "str"}
}

export interface SampleResponse {
    data: SingleSampleValue[]
}

export interface SampleValueGetter {
    getValues: (name: SampleKeys) => SampleInput
    keyList: SampleKeys[]
    getAbsorptionValues: (kind: AbsorptionKeys) => Promise<void>
    absorptionValues: SampleMassResponse
    unitOptions: SampleUnit[]
    currentAbsorptionKind: AbsorptionKeys
}

export interface SampleMassResponse {
    xlabel: string | null 
    ylabel: string | null
    x: string | null
    y: string | null
}