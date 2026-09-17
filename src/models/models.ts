import type React from "react";

export type MassUnits = "kg" | "g" | "mg" | "ug";
export type LengthUnits = "m" | "cm" | "mm" | "um";
export type EnergyUnits = "gev" | "kev" | "ev";

export const sampleKeys: SampleResponseKeys[] = [
  "formula",
  "absorber",
  "edge",
  "density",
  "area",
  "thickness",
  "mass",
];

export const unitKeys: SampleUnitKeys[] = [
  "mass_unit",
  "length_unit",
  "energy_unit",
];

export type SampleResponseKeys =
  | "formula"
  | "absorber"
  | "edge"
  | "density"
  | "area"
  | "mu_total"
  | "thickness"
  | "mass";

export type ExtendedResponseKeys = "cross sectional area" | "radius" | "diameter"

export type SampleUnitKeys = "mass_unit" | "length_unit" | "energy_unit";

export interface UnitValue {
  name: SampleUnitKeys;
  value: MassUnits | LengthUnits | EnergyUnits;
  options: MassUnits[] | LengthUnits[] | EnergyUnits[];
}

export interface SampleValueResponse {
  value: string | string[] | null;
  name: SampleResponseKeys;
}

export interface SampleResponse {
  name: string;
  values: SampleValueResponse[];
}

export type AbsorptionType = "mass" | "linear" | "total";

export interface ElementAbsorptionResponse {
  name: string;
  y: Array<number>;
}

export interface SampleAbsorptionResponse {
  x: Array<number>;
  xlabel: string;
  ylabel: string;
  y: ElementAbsorptionResponse[];
}

export interface SamplePhotoData {
  mass: null | SampleAbsorptionResponse;
  linear: null | SampleAbsorptionResponse;
  total: null | SampleAbsorptionResponse;
}

export interface SampleContextType {
  sampleList: SampleResponse[]
  addToSampleList: (sample: SampleResponse) => void
  deleteFromSampleList: (name: string) => void
  editSampleList: (sampleName: string, valName: SampleResponseKeys, newValue: string) => void
  replaceSampleValues: (sampleName: string, newValues: SampleValueResponse[]) => void
  getSample: (sampleName:string|null) => SampleResponse
  focusedSample: SampleResponse
  editFocusedSample: (valName: SampleResponseKeys, newValue: string) => void
  setFocusedSample: React.Dispatch<React.SetStateAction<SampleResponse>>
  photoData: SamplePhotoData
  setPhotoData: React.Dispatch<React.SetStateAction<SamplePhotoData>>
  getAvailableData: (sampleName: string) => string[]
}

export interface SampleMassRatioType {
  formula: string;
  ratio: number;
}
