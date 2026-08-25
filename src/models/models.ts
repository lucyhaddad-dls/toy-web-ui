

export type SampleKeys = "formula" | "absorber" | "edge" | "mu_total" | "density" | "area" |
        "mass_unit" | "energy_unit" | "length_unit" | "mass" | "thickness"



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
    getValue: (name: SampleKeys) => string | null
    keyList: SampleKeys[]
}