import axios, { type AxiosResponse } from "axios";
import type { User } from "./models";

export const getUser = async () => {
  const { data } = await axios.get<User, AxiosResponse<User>>("/user");

  return data;
};
