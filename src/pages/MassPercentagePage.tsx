import { Button, Fab, Grid, Grow, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { defaultFormulaInfoValues, nullSampleValues } from "../models/defaults";
import type {
  SampleMassRatioType, SampleValueResponse,
} from "../models/models";

import { getNewFormula } from "../models/queryFunctions";
import { SampleDataContext } from "../context/SampleContext";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { MassPercentInput } from "../components/MassPercentageInput";
import { useQuery } from "@tanstack/react-query";

function FormulaCalculator (props:{formulaInfo:SampleMassRatioType[]}) {

    const { isPending, error, data } = useQuery({
        queryKey: ["formulaInfo",{
            formulaList: props.formulaInfo.map(i => i.formula),
           ratioList: props.formulaInfo.map(i => i.ratio)}
        ],
        queryFn: () => getNewFormula(props.formulaInfo.map(i => i.formula),
                    props.formulaInfo.map(i => i.ratio))
    });

    if (error) return ( <Stack spacing={2} sx={{ p: 2,
         justifyContent:"space-between"}} direction="row">
                    <Typography
                    sx = {{color:"#1e4c61"}}>
                    <b>Error: {error.message}</b>
                    </Typography>
                    </Stack>
    )

    if (isPending) return ( <Stack spacing={2} sx={{ p: 2,
         justifyContent:"space-between"}} direction="row">
                    <Typography
                    sx = {{color:"#1e4c61"}}>
                    <b>Pending......</b>
                    </Typography>
                    </Stack>
    )
  
    return (
        
        <Stack spacing={2} sx={{ p: 2,
         justifyContent:"space-between"}} direction="row">

        <Typography
        sx = {{color:"#1e4c61"}}>
            <b> Formula: {data}</b>
        </Typography>
        </Stack>
    )
}

export function MassPercentagePage() {

  const [inputCount, setInputCount] = useState<number>(1);

  const { focusedSample } = useContext(SampleDataContext)

  const getDefaultValues = () => {
    let formula = focusedSample.values.filter(a =>a.name=="formula")[0].value.val
    if (formula == null){return defaultFormulaInfoValues}
    else {return [{formula:formula, ratio:1}]}
  }

  const [formulaInfo, setFormulaInfo] = useState<SampleMassRatioType[]>(getDefaultValues())

  const onAdd = () => {
    setFormulaInfo([...formulaInfo, { formula: "", ratio: 1 }]);
  };

  const onChange = (
    index: number,
    valname: "formula" | "pc",
    value: string | number,
  ) => {

    const data = [...formulaInfo];

    if (valname == "formula") {
      data[index][valname] = value as string;
      setFormulaInfo(data)
    }
    if (valname == "pc") {
      data[index]["ratio"] = value as number;
      setFormulaInfo(data)
    }
    return () => {}
  };

  const onDelete = (index: number) => {
    const data = [...formulaInfo];
    data.splice(index, 1);
    setFormulaInfo(data);
  };



  const onClear = () => {
    setInputCount(1)
    setFormulaInfo(getDefaultValues())
  }

  
  return (

    <Stack sx = {{ minWidth:"100vw"}}>
        current sample is {focusedSample.name} 
       
      <Stack spacing={2} sx={{ p: 2,
         justifyContent:"space-between"}} direction="row">

    <Stack sx={{bgcolor:"primary.light"}} direction="row">Calculated Formula:
        <FormulaCalculator formulaInfo={formulaInfo}/>

    </Stack>
        <Button>Save as new sample (unfinished)</Button>

        <Button>Overwrite old sample <br></br>({focusedSample.name} with 
        formula {focusedSample.values.filter(val=>val.name=="formula")[0].value.val})</Button>
        
        <Button variant="contained"
        onClick={onClear} sx={{bgcolor:"#616263"}}>
            Clear Sample Data</Button>


    </Stack>

    <Stack>
    <Grid container rowSpacing={1}
       columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx = {{ p:2 }}>
        {formulaInfo.map((_elm, indx) => {
           
          if (indx == inputCount - 1) {

            return (
            <Grow in={true} key={indx}>
              <Grid key={`${indx}-child`} rowSpacing={1} columnSpacing={1}>
                <MassPercentInput
                key={`${indx}-input`}
                  componentIndex={indx}
                  defaults={formulaInfo[indx]}
                  onChange={onChange} />
                <Stack
                    key = {`${indx}-stack-child`}
                  direction="row"
                  spacing={1}
                  sx={{ justifyContent: "flex-end" }}>
                  <Fab
                    key={`${indx}-fab`}
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
                <MassPercentInput
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

    </Stack>
       
        );
}