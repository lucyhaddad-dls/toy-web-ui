import axios, { type AxiosResponse } from "axios";
import { type SampleResponseKeys, type SampleUnitKeys, type SampleValueResponse, sampleKeys } from "./models";


export const getSampleData = async() => {
  const { data } = await axios.get <
    SampleValueResponse[], AxiosResponse<SampleValueResponse[]>
    > ("/api/input")

  const sample = data.filter((v) => sampleKeys.includes(v.name));

  return sample
}

export const postSampleData = async(name:SampleResponseKeys | SampleUnitKeys,
  value: string,) => {
    await axios(
      {method:"post",
        headers: {"Content-Type":"application/json",
                    name: name, value: value}
        }
    );
  }