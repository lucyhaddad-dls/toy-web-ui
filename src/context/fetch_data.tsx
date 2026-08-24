import type { TotalSampleInput } from "../models/models"

export const fetchInputValues = async() => {
    const response = await fetch("/api/input")
    const data = await response.json()
    console.log(data)
    }


export const getNamedValue = async(keyname:string) => {
    const response = await fetch("/api/input")
    const data:TotalSampleInput = await response.json()
    // list of {value: {val: , dtype:}, name:}
    data.map(tmp => 
    {
        if (tmp.name == keyname){
            return {...tmp}
        }
    }
    )
    
}