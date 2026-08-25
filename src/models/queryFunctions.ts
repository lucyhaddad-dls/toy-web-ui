import axios, { type AxiosResponse } from "axios";

import type { SampleResponse } from "./models";


export const getSampleData = async() => {
  const { data } = await axios.get<SampleResponse,
   AxiosResponse<SampleResponse>>("/api/input");
  return data
}