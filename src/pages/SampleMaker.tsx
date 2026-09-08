import { Button, Fab, Grid, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";

import { MultiSampleContext } from "../context/SampleContext";
import { defaultFormulaInfoValues, nullSampleValues } from "../models/defaults";
import type {
  SampleMassRatioType,
  SampleValueResponse,
} from "../models/models";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getNewFormula } from "../models/queryFunctions";

import Grow from '@mui/material/Grow'
import { SetNameBox } from "../components/SampleNameInput";
import { MassRatioInput } from "../components/MassRatioInput";

function FormulaBuilderPage() {
  const [inputCount, setInputCount] = useState<number>(1);

  const [values, setValues] = useState<SampleValueResponse[]>(nullSampleValues);

  const [formulaInfo, setFormulaInfo] = useState<SampleMassRatioType[]>(
    defaultFormulaInfoValues,
  );

  const { addToSampleList, getSampleNames } = useContext(MultiSampleContext);

  const onAdd = () => {
    setFormulaInfo([...formulaInfo, { formula: "", ratio: 1 }]);
  };

  const onChange = (
    index: number,
    valname: "formula" | "ratio",
    value: string | number,
  ) => {
    const data = [...formulaInfo];

    if (valname == "formula") {
      data[index][valname] = value as string;
    }
    if (valname == "ratio") {
      data[index][valname] = value as number;
    }

    setFormulaInfo(data);

    onCalculate()
  };

  const onDelete = (index: number) => {
    const data = [...formulaInfo];
    data.splice(index, 1);
    setFormulaInfo(data);
  };

  const onCalculate = () => {
    const formulaList = formulaInfo.map((i) => i.formula);
    const ratioList = formulaInfo.map((i) => i.ratio);

    getNewFormula(formulaList, ratioList).then((data) => {
      if (data != "") {
        const newValues = values.map((itm) => {
          if (itm.name == "formula") {
            return { ...itm, value: { ...itm.value, val: data } };
          } else {
            return itm;
          }
        });
        setValues(newValues);
      }
    });
    return () => {};
  };

  const onNameChange = (name: string) => {
    addToSampleList(values, name);
    getSampleNames();
  };

  const onClear = () => {
    setInputCount(1)
    setFormulaInfo(defaultFormulaInfoValues)
  }

  return (
    <Stack sx = {{ minWidth:"100vw"}}>
      <Stack spacing={2} sx={{ p: 2,
         justifyContent:"space-evenly",
         maxWidth:"40%" }} direction="row">
        <Typography
        sx = {{color:"#1e4c61"}}>
        <b> Formula: {values.filter((v) => v.name == "formula")[0].value.val}</b>
        </Typography>
        </Stack>
        <Stack direction="row" spacing={1}
        sx={{ justifyContent:"flex-end", margin:"1vw"}} >
          
        <SetNameBox onName={onNameChange}/>
        {/* add default input ^ */}

        <Button variant="contained"
        onClick={onClear} sx={{bgcolor:"#616263"}}>
            Clear Sample Data</Button>
        </Stack>
      
      <Grid container rowSpacing={1}
       columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx = {{ p:2 }}>
        {formulaInfo.map((_elm, indx) => {
          if (indx == inputCount - 1) {
            return (
            <Grow in={true} key={indx}>
              <Grid key={`${indx}-child`} rowSpacing={1} columnSpacing={1}>
                <MassRatioInput
                  componentIndex={indx}
                  defaults={formulaInfo[indx]}
                  onChange={onChange} />
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ justifyContent: "flex-end" }}>
                  <Fab
                    sx={{ bgcolor: "#5f967a", color: "#fefefe" }}
                    size="small"
                    variant="circular"
                    onClick={() => {
                      setInputCount(inputCount + 1);
                      onAdd();
                    }}>
                    <AddIcon />
                  </Fab>
                  <Fab
                    sx={{ bgcolor: "#696969", color: "#fefefe" }}
                    size="small"
                    variant="circular"
                    onClick={() => {
                      if (inputCount > 1) {
                        setInputCount(inputCount - 1);
                        onDelete(indx);
                      }
                    }} >
                    <DeleteOutlinedIcon />
                  </Fab>{" "}
                </Stack>
              </Grid>
              </Grow>
            );
          }
          if (indx != inputCount) {
            return (
            <Grow in={true}>
              <Grid key={`${indx}-child`}>
                <MassRatioInput
                  componentIndex={indx}
                  defaults={formulaInfo[indx]}
                  onChange={onChange}/>
              </Grid>
              </Grow>
            );
          }
        })}
      </Grid>
    </Stack>
  );
}


export function MassRatioBuilderPage() {
  return (
    <Grid container sx = {{display: "flex",  justifyContent: 'space-between' }}>
      <Grid sx = {{maxWidth: "60%"}}>
      <FormulaBuilderPage/>
      </Grid>
    </Grid>
  );
}
