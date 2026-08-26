import { useContext, useState } from "react";
import type { SampleResponseKeys, SampleUnitKeys, UnitValue } from "../models/models";
import { DataContext } from "../context/DataContext";
import { InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";

function TextInput(props: { name: SampleResponseKeys; key: string }) {
  const { getValue } = useContext(DataContext);

  const measurement: string = getValue(props.name);

  return (
    <Stack>
        <Typography variant="h6">{props.name}</Typography>
      <TextField defaultValue={measurement} />
    </Stack>
  );
}

function UnitInput(props: {name: SampleUnitKeys, key: string}){

    
    const { sampleUnits } = useContext(DataContext)

    const unit:UnitValue = sampleUnits.filter((v:UnitValue) => 
                                    v.name == props.name)[0]

    const [selected, setSelected] = useState<string>(unit.value)

    return (
        <Stack>
            <InputLabel>{props.name.replace("_", " ")}</InputLabel>
            <Select value={selected}>
            
            {unit.options.map((option) => (
                <MenuItem key={option}
                label={selected}
                value = {option}
                selected = {selected === option}
                onClick={() => setSelected(option)}>
                    {option}
                </MenuItem>
            ))}
        </Select>
        </Stack>
    )
}

export function MakeTextInput() {
  const { getInitialValues, sampleValues } = useContext(DataContext);

  if (sampleValues[0].value.val == null){getInitialValues()}

  return (
    <Stack direction="row" spacing={2}>
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        {["formula", "absorber", "edge"].map((k, i) => {
          return (
            <TextInput name={k as SampleResponseKeys} key={i.toString()} />
          );
        })}
      </Stack>
      <Stack direction="row" spacing={2}>
        {["density", "area", "thickness"].map((k, i) => {
          return (
            <TextInput name={k as SampleResponseKeys} key={i.toString()} />
          );
        })}
      </Stack>
    </Stack>
    <Stack spacing={2}>
        {["mass_unit", "length_unit", "energy_unit"].map((k, i) => {
            return (<UnitInput name = {k as SampleUnitKeys}
            key = {i.toString()}/>)
        })} 
     </Stack>
    </Stack>
  );
}
