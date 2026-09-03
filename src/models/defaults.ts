import type { AbsorptionDatasetType, checkedAbsorptionValues, SampleMassRatioType, SampleValueResponse, 
              UnitValue } from "./models";


export const defaultSampleUnits: UnitValue[] = [
    { name: "mass_unit", value: "g", options: ["kg", "g", "mg", "ug"] },
    { name: "length_unit", value: "cm", options: ["m", "cm", "mm", "um"] },
    { name: "energy_unit", value: "kev", options: ["gev", "kev", "ev"] },
  ];

export const nullSampleValues: SampleValueResponse[] = [
  {name:"formula", value:{val:null, dtype:"str"}},
  {name:"absorber", value:{val:null, dtype:"str"}},
  {name:"edge", value:{val:null, dtype:"str"}},
  {name:"density", value:{val:null, dtype:"float"}},
  {name:"area", value:{val:null, dtype:"float"}},
  {name:"thickness", value:{val:null, dtype:"float"}},
  {name:"mass", value:{val:null, dtype:"float"}}
];

export const defaultAbsorptionValues: AbsorptionDatasetType = {
  mass: null,
  linear: null,
  total: null
}

export const defaultFormulaInfoValues: SampleMassRatioType[] = [
  {formula: "", ratio:1}
]

export const defaultCheckedAbsorptionValues: checkedAbsorptionValues = {
  mass: false, linear: false, total: false
}

