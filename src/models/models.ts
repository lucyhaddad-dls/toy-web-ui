
type MassUnits = "kg" | "g" | "mg" | "ug"
type LengthUnits = "m" | "cm" | "mm" | "um"
type EnergyUnits = "gev" | "ev"

export type AbsorptionType = "mass" | "linear" | "total"

export type SampleResponseKeys = "formula" | "absorber" | "edge" | "density" |
"area" | "thickness" | "mass"

export type SampleUnitKeys = "mass_unit" | "length_unit" | "energy_unit"

export interface UnitValue {
    name: SampleUnitKeys
    value: MassUnits | LengthUnits | EnergyUnits
    options: MassUnits[] | LengthUnits[] | EnergyUnits[]
}

interface SampleValueValue {
    val: string | null
    dtype: "str" | "float" | "int"
}

export interface SampleValue {
    value: SampleValueValue
    name: SampleResponseKeys
}

export interface AbsorptionDataResponse {
    xlabel: string | null
    ylabel: string | null
    x: string | null
    y: string | null
}


export interface AbsorptionDataSet {
    data: AbsorptionDataResponse
    kind: AbsorptionType
}

export interface SampleValueResponse {
    value: SampleValueValue
    name: SampleResponseKeys | SampleUnitKeys
}

export interface SampleProviderData {
    sampleUnits: UnitValue[]
    sampleValues: SampleValue[]
    setSampleUnits: React.Dispatch<React.SetStateAction<UnitValue[]>>
    absorptionData: AbsorptionDataSet[] | undefined
    getInitialValues: () => Promise<void>
    postNewValue: (name: SampleUnitKeys | SampleResponseKeys, value: string) => Promise<void>
    getValue: (name: SampleResponseKeys) => string | null
    testGetAllAbsorption: (elements?: string[]) => Promise<void>

}