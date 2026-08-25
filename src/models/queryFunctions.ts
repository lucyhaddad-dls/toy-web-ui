import axios, { Axios, type AxiosResponse } from "axios";

import type { SampleMassResponse, SampleResponse } from "./models";


export const getSampleData = async() => {
  const { data } = await axios.get<SampleResponse,
   AxiosResponse<SampleResponse>>("/api/input");
  return data
}


// need to add elements arg. to this!
export const getMassAbsorption = async() => {
  const response = await axios<SampleMassResponse,
   AxiosResponse<SampleMassResponse>>({
    method:"post",
    url: "/api/calculate/mass-absorption",
    headers: {"Content-Type": "application/json",
            "elements": ["total"]
    }
  })
  const data = response.data

  return data
}