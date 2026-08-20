import { http, HttpResponse } from "msw";
import type { Hello, TotalSampleInput } from "../model_utils/models";

export const handlers = [
  // adding fake sample-mass-calcs output here.
  http.get("/api", () => {
    const mockHello: Hello = {
      message: "MASS CALCULATOR!!"
    };
    return HttpResponse.json(mockHello)
  }),

  http.get("/api/input", () => {
    const mockInput: TotalSampleInput = {
      fields: [
        {value: {val:"Cu",dtype:"str"}, name:"formula"},
        {value: {val:"K", dtype:"str"}, name:"absorber"},
        {value: {val:"1.0", dtype:"float"}, name:"density"},
        {value: {val:"0.5", dtype:"float"}, name:"area"},
        {value: {val:null, dtype:"float"}, name:"mass"},
        {value: {val:null, dtype:"float"}, name:"thickness"},
        {value: {val:"2.6", dtype:"float"}, name:"mu_total"},
        {value: {val:"g", dtype:"str"}, name:"mass_unit"},
        {value: {val:"cm", dtype:"str"}, name:"length_unit"},
        {value: {val:"gev", dtype:"str"}, name:"energy_unit"}
       ]
    };
    return HttpResponse.json(mockInput)

  })
]

