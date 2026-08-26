import { type UnitValue, type SampleValue, type AbsorptionDataResponse } from "./models";

export const sampleUnitsDefault: UnitValue[] = [
    { name: "mass_unit", value: "g", options: ["kg", "g", "mg", "ug"] },
    { name: "length_unit", value: "cm", options: ["m", "cm", "mm", "um"] },
    { name: "energy_unit", value: "gev", options: ["gev", "ev"] },
  ];


export const sampleValuesDefault: SampleValue[] = [
    {name:"formula", value:{val:null, dtype:"str"}},
    {name:"absorber", value:{val:null, dtype:"str"}},
    {name:"edge", value:{val:null, dtype:"str"}},
    {name:"density", value:{val:null, dtype:"float"}},
    {name:"area", value:{val:null, dtype:"float"}},
    {name:"thickness", value:{val:null, dtype:"float"}},
    {name:"mass", value:{val:null, dtype:"float"}}
]

export const nullAbsorptionValues: AbsorptionDataResponse = 
{
    xlabel: null,
    ylabel: null,
    x: null,
    y: null
}