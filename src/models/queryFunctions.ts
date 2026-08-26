import axios, { type AxiosResponse } from "axios";
import type {
  AbsorptionDataResponse,
  SampleValueResponse,
  SampleValue,
  SampleResponseKeys,
  SampleUnitKeys,
} from "./models";
import { JavascriptOutlined } from "@mui/icons-material";

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


export const getMassAbsorptionData = async (elements: string[]) => {
  const response = await axios<
    AbsorptionDataResponse,
    AxiosResponse<AbsorptionDataResponse>
  >({
    method: "post",
    url: "/api/calculate/mass-absorption",
    headers: { "Content-Type": "application/json", elements: elements },
  });
  return response.data;
};

export const getLinearAbsorptionData = async (elements: string[]) => {
  const response = await axios<
    AbsorptionDataResponse,
    AxiosResponse<AbsorptionDataResponse>
  >({
    method: "post",
    url: "/api/calculate/linear-absorption",
    headers: { "Content-Type": "application/json", elements: elements },
  });
  return response.data;
};

export const getTotalAbsorptionData = async (elements: string[]) => {
  const response = await axios<
    AbsorptionDataResponse,
    AxiosResponse<AbsorptionDataResponse>
  >({
    method: "post",
    url: "/api/calculate/total-absorption",
    headers: { "Content-Type": "application/json", elements: elements },
  });
  return response.data;
};
