import { useContext } from "react";
import { SampleContext } from "../context/SampleContext";
import { TextField, Stack, Typography } from "@mui/material";
import type { SampleKeys } from "../models/models";

function TextInput(props: {name: SampleKeys, key: string}) {
  const { getValues } = useContext(SampleContext)

  const val = getValues(props.name)

  return <Stack>
    <Typography variant = "h6">{props.name}</Typography>
    <TextField defaultValue={val}/>
    </Stack>
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
