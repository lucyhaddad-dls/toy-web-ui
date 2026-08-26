import { useContext } from "react";
import { SampleContext } from "../context/SampleProviderContext";
import { TextField, Stack, Typography, Select, MenuItem } from "@mui/material";
import type { SampleKeys } from "../models/models";


function TextInput(props: {name: SampleKeys, key: string}) {
  const { getValues, unitOptions } = useContext(SampleContext)

  const measurement = getValues(props.name)

  if (measurement.isUnit == false){
        return <Stack>
          <Typography variant = "h6">{props.name}</Typography>
          <TextField defaultValue={measurement.value}/>
          </Stack>
      }
  if (measurement.isUnit == true){

    // getting list of options for each unit
      const options = unitOptions.filter((val) => val.name == props.name)[0].options
  
    return <Stack>
      <Select
      value = {measurement.value}
      >
        {options.map((val) => <MenuItem value={val}>
          {val}
        </MenuItem>)}

      </Select>

    </Stack>
  }
}
export function MakeTextInput() {

  const { keyList } = useContext(SampleContext)
  const half = Math.floor(keyList.length/2)

  const firstKeys = keyList.slice(0, half)
  const lastKeys = keyList.slice(half, keyList.length)

  return <Stack spacing={2}>
    <Stack direction="row" spacing={2}>
    {firstKeys.map((k, i) => 
    {
      const key :string = String(i)
        return <TextInput name={k} key={key}/>
    })
    }
    </Stack>
    <Stack direction="row" spacing={2}>
      {lastKeys.map((k, i) =>
      { 
      const key:string = String(i)
          return <TextInput name={k} key={key}/>
      })
      }
    </Stack>
  </Stack>
}
