import axios, { type AxiosResponse } from "axios";
import type {
  AbsorptionDataResponse,
  SampleValueResponse,
  SampleValue,
  SampleResponseKeys,
  SampleUnitKeys,
} from "./models";
import { nullAbsorptionValues } from "./defaults";

export const sampleKeys = [
  "formula",
  "absorber",
  "edge",
  "density",
  "area",
  "thickness",
];

export const getSampleData = async () => {
  const { data } = await axios.get<
    SampleValueResponse[],
    AxiosResponse<SampleValue[]>
  >("/api/input");

  const sample = data.filter((v) => sampleKeys.includes(v.name));

  return sample;
};

export const postSampleValue = async (
  name: SampleResponseKeys | SampleUnitKeys,
  value: string,
) => {
  const response = await axios<
    SampleValueResponse[],
    AxiosResponse<SampleValue[]>
  >({
    method: "post",
    // better way to do this?
    url: `/api/input?name=${name}&value=${value}`,
    headers: { "Content-Type": "application/json"
    }

  });

  const sample = response.data.filter((v) => sampleKeys.includes(v.name));
  return sample;
};

export const testPost = async (elements: string[]) => {
  const response = await axios.post("/api/calculate/mass-absorption", elements);

  if (response.status != 200) {
    throw new Error("Failed to get absorption data");
  }

  return response.data;
};


export const getMassAbsorptionData = async (elements: string[]) => {
  // eslint-disable-next-line no-useless-assignment
  let response = {data: nullAbsorptionValues}
  try { response = await axios <AbsorptionDataResponse,
    AxiosResponse<AbsorptionDataResponse>> ({
    method: "post",
    url: "/api/calculate/mass-absorption",
    headers: { "Content-Type": "application/json", 
    elements: elements},
  }); } catch {
    response = {data: nullAbsorptionValues}
  }

  return response.data
};

export const getLinearAbsorptionData = async (elements: string[]) => {
  // eslint-disable-next-line no-useless-assignment
  let response = {data: nullAbsorptionValues}
  try { response = await axios <AbsorptionDataResponse,
    AxiosResponse<AbsorptionDataResponse>> ({
    method: "post",
    url: "/api/calculate/linear-absorption",
    headers: { "Content-Type": "application/json", 
    elements: elements},
  }); } catch {
    response = {data: nullAbsorptionValues}
  }
  return response.data
};

export const getTotalAbsorptionData = async (elements: string[]) => {
  // eslint-disable-next-line no-useless-assignment
  let response = {data: nullAbsorptionValues}
  try { response = await axios <AbsorptionDataResponse,
    AxiosResponse<AbsorptionDataResponse>> ({
    method: "post",
    url: "/api/calculate/total-absorption",
    headers: { "Content-Type": "application/json", 
    elements: elements},
  }); } catch {
    response = {data: nullAbsorptionValues}
  } 
  return response.data
};
