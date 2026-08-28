import axios, { type AxiosResponse } from "axios";
import { type AbsorptionType, type SampleResponseKeys, type SampleUnitKeys, type SampleValueResponse, sampleKeys } from "./models";


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

  export const getAbsorptionData = async(abs_type:AbsorptionType) => {

    const data = await axios.get("/api/absorption",
       {params: {abs_type: abs_type}}
      ).then((response) => {return response.data})
    .catch((err) => console.log(err));
      
    return data
    
  }
