import axios, { type AxiosResponse } from "axios";
import type { AllValuesResponse, SampleValueResponse } from "./models";

export const getAllData = async ( 
  sampleData: SampleValueResponse[]
) => {
  const { data } = await axios.post<AllValuesResponse,
   AxiosResponse<AllValuesResponse>>
  ("/api/calculate/all", {input_data:sampleData})

  return data
}

export const getNewFormula = async (
  formula_list: string[],
  ratios: number[] | string[],
) => {
  const data = await axios.post<string, AxiosResponse<string>>
  ("/api/calculate/formula/mass-ratios", { formula_list, ratios })
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });

  return data;
};

export const debounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
) => {
  let timeoutID: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
};
