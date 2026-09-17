import { useCallback, useContext, useState, type ChangeEvent } from "react";
import type {
  ExtendedResponseKeys,
  SampleResponseKeys,
} from "../../models/models";
import { SampleContext } from "../../context/SampleContext";
import { Grid, TextField } from "@mui/material";
import { debounce } from "../../models/queryFunctions";

export function SamplePropertyInput(props: {
  sampleId: string;
  name: SampleResponseKeys;
  label: string | null;
}) {
  const { getSample, editFocusedSample } = useContext(SampleContext);

  const sample = getSample(props.sampleId);
  let [initValue, setInitValue] = useState(
    sample.values.find((i) => i.name == props.name)?.value,
  );
  if (initValue == undefined || initValue == null) {
    setInitValue("");
  }

  let label = "";
  if (props.label) {
    label = props.label;
  } else {
    label = props.name;
  }

  const handleInput = useCallback(
    debounce(
      (val: ChangeEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
        if (val.target.value != undefined) {
          editFocusedSample(props.name, val.target.value);
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
        label={label}
        onChange={handleInput}
      />
    </Grid>
  );
}

function CustomPropertyInput(props: {
  sampleId: string;
  name: SampleResponseKeys;
  label: string | null;
  converter: (value: string) => string;
  inv: (value: string) => string;
}) {
  const { getSample, editFocusedSample } = useContext(SampleContext);

  const sample = getSample(props.sampleId);
  let [initValue, setInitValue] = useState(
    sample.values.find((i) => i.name == props.name)?.value,
  );
  if (initValue == undefined || initValue == null) {
    setInitValue("");
  }

  let defaultValue = "";
  if (initValue != "") {
    defaultValue = props.inv(initValue as string);
  }

  let label = "";
  if (props.label) {
    label = props.label;
  } else {
    label = props.name;
  }

  const handleInput = useCallback(
    debounce(
      (val: ChangeEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
        if (val.target.value != undefined) {
          editFocusedSample(props.name, props.converter(val.target.value));
        }
      },
      200,
    ),
    [],
  );

  return (
    <Grid key={`${props.name}-text-input`}>
      <TextField
        defaultValue={defaultValue}
        label={label}
        onChange={handleInput}
      />
    </Grid>
  );
}

export function ExtendedPropertyInput(props: {
  sampleId: string;
  name: ExtendedResponseKeys;
}) {
  if (props.name === "cross sectional area") {
    return (
      <SamplePropertyInput
        sampleId={props.sampleId}
        name={"area"}
        label={props.name}
      />
    );
  }

  if (props.name === "radius") {
    const converter = (value: string) => {
      const val = Number(value);
      const area = Math.PI * val ** 2;
      return area.toString();
    };
    const inv = (value: string) => {
      const val = Number(value);
      const radius = Math.sqrt(val) / Math.PI;
      return radius.toString();
    };

    return (
      <CustomPropertyInput
        sampleId={props.sampleId}
        name={"area"}
        label={"radius"}
        converter={converter}
        inv={inv}
      />
    );
  }

  if (props.name === "diameter") {
    const converter = (value: string) => {
      const val = Number(value);
      const area = Math.PI * (val / 2) ** 2;
      return area.toString();
    };
    const inv = (value: string) => {
      const val = Number(value);
      const diameter = (2 * Math.sqrt(val)) / Math.PI;
      return diameter.toString();
    };
    return (
      <CustomPropertyInput
        sampleId={props.sampleId}
        name={"area"}
        label={"diameter"}
        converter={converter}
        inv={inv}
      />
    );
  }
}
