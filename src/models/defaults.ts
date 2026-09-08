import type {  SampleMassRatioType, SamplePhotoData, SampleValueResponse, 
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


export const defaultFormulaInfoValues: SampleMassRatioType[] = [
  {formula: "", ratio:1}
]

export const nullAbsorptionData: SamplePhotoData = {
  mass: null,
  linear: null,
  total: null
}

export const calcDependencies = {
  "density": [["mass", "thickness", "area"],
            ["mass", "radius", "thickness"]],
  "mass": ["area", "thickness", "density"],
  "mass_absorption": ["formula", "absorber", "edge"],
  "linear_absorption": ["formula", "absorber", "edge", "density"],
  "total_absorption": ["formula", "absorber", "edge", "density", "thickness"]
}
