import axios, { type AxiosResponse } from "axios";
import { type TotalSampleInput, type Hello} from "./models";

export const getHello = async() => {
  const { data } = await axios.get<Hello, AxiosResponse<Hello>>("/api");
  return data;
}

export const getInput = async() => {
  const { data } = await axios.get<TotalSampleInput, AxiosResponse<TotalSampleInput>>("/api/input");
  return data;
}