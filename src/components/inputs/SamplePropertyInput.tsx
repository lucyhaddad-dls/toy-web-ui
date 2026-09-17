import { useCallback, useContext, useState, type ChangeEvent } from "react";
import type { SampleResponseKeys } from "../../models/models";
import { SampleContext } from "../../context/SampleContext";
import { Grid, TextField } from "@mui/material";
import { debounce } from "../../models/queryFunctions";

export function SamplePropertyInput(props: {
  sampleId: string;
  name: SampleResponseKeys
}) {
  const {getSample, editFocusedSample} = useContext(SampleContext)

  const sample = getSample(props.sampleId);
  let [initValue, setInitValue] = useState(
    sample.values.find((i) => i.name == props.name)?.value,
  );
  if (initValue == undefined || initValue == null) {
    setInitValue("");
  }

  const handleInput = useCallback(
    debounce(
      (val: ChangeEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
        if (val.target.value != undefined) {
          editFocusedSample(props.name, val.target.value)
        }
      },
      200,
    ),
    [],

  );

  return (
    <Grid key={`${props.name}-text-input`}>
      <TextField
        defaultValue={initValue}
        label={props.name}
        onChange={handleInput}
      />
    </Grid>
  );
}
