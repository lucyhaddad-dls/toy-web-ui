import { http, HttpResponse } from "msw";
import type { SampleValueResponse } from "../models/models";

const mockSampleData: SampleValueResponse[] = [
  {
    value: "Cu",

    name: "formula",
  },
  {
    value: "Cu",
    name: "absorber",
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
    value: null,

    name: "thickness",
  },
  {
    value: "2.6",

    name: "mu_total",
  },
];

export const handlers = [
  http.get("/api/input", () => {
    return HttpResponse.json(mockSampleData);
  }),

  http.post("/api/input", async ({ request }) => {
    await request.json();
    return HttpResponse.json({ status: 200 });
  }),
];
