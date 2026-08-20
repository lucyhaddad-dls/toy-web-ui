
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
