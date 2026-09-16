import axios, { type AxiosResponse } from "axios";
import {
  type AbsorptionType,
  type SampleValueResponse,
  sampleKeys,
} from "./models";

export const getSampleData = async () => {
  const { data } = await axios.get<
    SampleValueResponse[],
    AxiosResponse<SampleValueResponse[]>
  >("/api/input");

  const sample = data.filter((v) => sampleKeys.includes(v.name));

  return sample;
};

export const getAbsorptionData = async (
  input_data: SampleValueResponse[],
  abs_type: AbsorptionType,
) => {
  const data = await axios
    .post("/api/absorption", input_data, { params: { abs_type: abs_type } })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return data;
};

export const getNewFormula = async (
  formula_list: string[],
  ratios: number[] | string[],
) => {
  const data: string = await axios
    .post("/api/calculate/formula/mass-ratios", { formula_list, ratios })
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
