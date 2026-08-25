import { useContext } from "react";
import { SampleContext } from "../context/SampleContext";
import { TextField, Stack, Typography } from "@mui/material";
import type { SampleKeys } from "../models/models";

function TextInput(props: {name: SampleKeys, key: string}) {
  const { getValues } = useContext(SampleContext)

  const val = getValues(props.name)

  return <Stack>
    <Typography variant = "h5">{props.name}</Typography>
    <TextField defaultValue={val}/>
    </Stack>
}

export function MakeTextInput() {

  const { keyList } = useContext(SampleContext)

  return <Stack>
    {keyList.map((k, i) => 
    {
      const key :string = String(i)
    return <TextInput name={k} key={key}/>
    })
    }
  </Stack>
}
