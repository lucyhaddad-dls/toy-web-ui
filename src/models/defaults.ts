import type {  SampleMassRatioType, SamplePhotoData, SampleValueResponse, 
              UnitValue } from "./models";


export const defaultSampleUnits: UnitValue[] = [
    { name: "mass_unit", value: "g", options: ["kg", "g", "mg", "ug"] },
    { name: "length_unit", value: "cm", options: ["m", "cm", "mm", "um"] },
    { name: "energy_unit", value: "kev", options: ["gev", "kev", "ev"] },
  ];

export const nullSampleValues: SampleValueResponse[] = [
  {name:"formula", value:null},
  {name:"absorber", value:null},
  {name:"edge", value:null},
  {name:"density", value:null},
  {name:"area", value:null},
  {name:"thickness", value:null},
  {name:"mass", value:null},
];

export const exampleSampleValues: SampleValueResponse[] = [
  {name:"formula", value:"FeOH"},
  {name:"absorber", value:"Fe"},
  {name:"edge", value:"K"},
  {name:"density", value:null},
  {name:"area", value:null},
  {name:"thickness", value:null},
  {name:"mass", value:null}
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
