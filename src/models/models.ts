
export interface Hello {
  message: string
}


export interface SampleInput {
  value: {val: string|null, dtype: string}
  name: string
}

export interface TotalSampleInput {
  fields: SampleInput[]
}


export interface SingleValue {
  val: string | null
  dtype: string
}

export interface SampleInputValues {
  formula: SingleValue
  absorber: SingleValue
  edge: SingleValue
  mu_total: SingleValue
  density: SingleValue
  area: SingleValue
  mass: SingleValue
  thickness: SingleValue
  mass_unit: SingleValue
  length_unit: SingleValue
  energy_unit: SingleValue
}