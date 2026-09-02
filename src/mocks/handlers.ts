import { http, HttpResponse } from "msw";
import type { SampleValueResponse } from "../models/models";

const mockSampleData: SampleValueResponse[] = [

  {
    "value": {
      "val": "Cu",
      "dtype": "str"
    },
    "name": "formula"
  },
  {
    "value": {
      "val": "Cu",
      "dtype": "str"
    },
    "name": "absorber"
  },
  {
    "value": {
      "val": "K",
      "dtype": "str"
    },
    "name": "edge"
  },
  {
    "value": {
      "val": null,
      "dtype": "float"
    },
    "name": "density"
  },
  {
    "value": {
      "val": null,
      "dtype": "float"
    },
    "name": "area"
  },
  {
    "value": {
      "val": null,
      "dtype": "float"
    },
    "name": "mass"
  },
  {
    "value": {
      "val": null,
      "dtype": "float"
    },
    "name": "thickness"
  },
  {
    "value": {
      "val": "2.6",
      "dtype": "float"
    },
    "name": "mu_total"
  }
]


export const handlers = [
  http.get("/api/input", () => {
    return HttpResponse.json(mockSampleData);
  }),
  
  http.post("/api/input", async ({ request }) => {
    await request.json()
    return HttpResponse.json({status: 200});
  }),

  

];