import axios, { type AxiosResponse } from "axios";
import { type AbsorptionType, type SampleResponseKeys, type SampleUnitKeys,
   type SampleValueResponse, sampleKeys } from "./models";


export const getSampleData = async() => {
  const { data } = await axios.get <
    SampleValueResponse[], AxiosResponse<SampleValueResponse[]>
    > ("/api/input")

  const sample = data.filter((v) => sampleKeys.includes(v.name));

  return sample
}

export const postSampleData = async(name:SampleResponseKeys | SampleUnitKeys,
  value: string,) => {
    await axios.post("/api/input", null,
       {params:{name, value}}
     ).then((response) => {return response.data})
     .catch(error => {return error})

  }

  export const getAbsorptionData = async(abs_type:AbsorptionType) => {

    const data = await axios.get("/api/absorption", {params:{abs_type:abs_type}}
      ).then((response) => {return response.data})
    .catch((err) => {console.log(err); return null});
    return data
    
  }


export const getNewFormula = async(formula_list:string[],
   ratios:number[]|string[]) => {

  const data:string = await axios.post("/api/calculate/formula/mass-ratios",
    {formula_list, ratios})
    .then(data => {return data.data})
    .catch(error => {console.log(error); return ""});
    
    return data
}
