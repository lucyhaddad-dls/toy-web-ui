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
    // should maybe add check in here if the input is valid?
    const response = await axios.post("/api/input", {},
      {params: {name, value}}
     );
    if (response.status != 200){
      throw new Error("Failed to post new data")
    };
  }

  export const getAbsorptionData = async(abs_type:AbsorptionType) => {

    const data = await axios.get("/api/absorption",
       {params: {abs_type: abs_type}}
      ).then((response) => {return response.data})
    .catch((err) => console.log(err));
      
    return data
    
  }


export const getNewFormula = async(formula_list:string[],
   ratios:number[]|string[]) => {

  const response = await axios.post(
    "/api/calculate/formula/mass-ratios", {},
    {params: {formula_list:formula_list, ratios:ratios}}
  );
  if (response.status!=200){throw new Error("Failed to get new formula")}
  return response
}