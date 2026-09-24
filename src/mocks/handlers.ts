import { http, HttpResponse } from "msw";
import type { SampleValueResponse } from "../models/models";
import alldata from "./test_data_all.json"

export const mockSampleInput: SampleValueResponse[] = [
  {
    value: "CuOH2",
    name: "formula",
  },

  {
    value: "K",
    name: "edge",
  },
  {
    value: null,
    name: "density",
  },
  {
    value: null,
    name: "area",
  },
  {
    value: null,
    name: "mass",
  },
  {
    value: "0.5",
    name: "thickness",
  },
  {
    value: "2.6",

    name: "mu_total",
  },
];

const mockAllDataResponse = alldata

export const handlers = [

  http.post("/api/calculate/all", async ({request }) => {
    const requestObj = await request.json()
    console.log(requestObj)
    return HttpResponse.json(mockAllDataResponse, {status:200})
  
  }),
]
