import { Box, Button, Grid, Stack } from "@mui/material";
import { ValueField } from "../components/ValueFields";
import type {
  EnergyUnits,
  LengthUnits,
  MassUnits,
  SampleResponseKeys,
  SampleUnitKeys,
  SampleValueResponse,
  UnitValue,
} from "../models/models";
import { useContext, useState } from "react";
import { SampleContext } from "../context/SampleContext";
import { getSampleData, postSampleData } from "../models/queryFunctions";
import { UnitSelectField } from "../components/UnitInput";
import { defaultAbsorptionValues, defaultSampleUnits } from "../models/defaults";
import { PlotComponent } from "../components/PlotComponent";

export function TransmissionPage() {
  const { values, setValues, setAbsorption, checkValues } = useContext(SampleContext);

  const [currentValues, setCurrentValues] =
    useState<SampleValueResponse[]>(values);

  const [currentUnits, setCurrentUnits] =
    useState<UnitValue[]>(defaultSampleUnits);


  const onChange = (name: SampleResponseKeys, value: string) => {
    const newData = currentValues.map((itm) => {
    if (value.length < 1){return { ...itm, value: { ...itm.value, val: null } }}
      if (itm.name == name) {
        return { ...itm, value: { ...itm.value, val: value } };
      } else {
        return itm;
      }
    });
    setCurrentValues(newData);
    return () => {};
  };

  const onPost = () => {
    currentValues.map((k) => {
      if (k.value.val != null) {
        postSampleData(k.name, k.value.val as string);
      }
      else { postSampleData(k.name, "None") }
    });
    // reset absorption data:
    setAbsorption(defaultAbsorptionValues)

    getSampleData().then((data) => setValues(data));
    checkValues()
    
  };

  const onUnitChange = (
    name: SampleUnitKeys,
    value: MassUnits | EnergyUnits | LengthUnits,
  ) => {
    const newUnits = currentUnits.map((v) => {
      if (v.name == name) {
        return { ...v, value: value };
      } else {
        return v;
      }
    });
    setCurrentUnits(newUnits);
  };

  return (
    <Stack sx={{ alignItems: "center" }}>
      <Box sx={{ p: 4 }}>
        Sample Measurement Inputs
        <Button
          variant="contained"
          onClick={() => {
            onPost();
          }}
        >
          Update
        </Button>
      </Box>

      <Stack direction="row" sx={{ ml: 1 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {["formula", "absorber", "edge"].map((k, i) => {
            return (
              <Grid key={i.toString()}>
                <ValueField
                  key={i.toString()}
                  default={values.filter((v) => v.name == k)[0]}
                  onChange={onChange}
                />
              </Grid>
            );
          })}

          {["density", "area", "thickness", "mass"].map((k, i) => {
            return (
              <Grid key={i.toString()}>
                <ValueField
                  key={i.toString()}
                  default={values.filter((v) => v.name == k)[0]}
                  onChange={onChange}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {["mass_unit", "length_unit", "energy_unit"].map((k) => {
            return (
              <Grid key={k}>
                <UnitSelectField
                  key={k}
                  default={currentUnits.filter((c) => c.name == k)[0]}
                  onChange={onUnitChange}
                />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
      <PlotComponent/>
    </Stack>
  );
}
