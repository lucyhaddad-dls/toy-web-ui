import { useContext } from "react";
import { SampleDataContext } from "../../context/SampleContext";
import { Grid, Stack, Typography } from "@mui/material";
import { nullSampleValues } from "../../models/defaults";
import { SamplePropertyInput } from "../components/SamplePropertyInput";
import AddIcon from '@mui/icons-material/Add';

export function EditPropertiesPage () {
    const { sampleList, currentName } = useContext(SampleDataContext)

    let currentSample = sampleList.find(i => i.name == currentName)
    if (currentSample == undefined){
        // make an empty sample (this condition shouldn't occur?)
        currentSample = {name:currentName as string,
             values:nullSampleValues}
    }


    let initialValues = currentSample.values.filter(i => i.value.val!=null)
    // set to formula, asorber and edge here as defaults!!!!
    if (initialValues.length == 0){
        initialValues = [{name:"formula", value:{val:"", dtype:"str"}},
            {name:"absorber", value:{val:"", dtype:"str"}},
            {name:"edge", value:{val:"", dtype:"str"}},]
    }

    return (
        <Stack spacing={2} sx={{m:1,}}>
        <Typography align="center">
        <b>Current sample: {currentName}</b>
        </Typography>
        <Stack direction="row" sx={{justifyContent:"center"}}>
            Add Property
            <AddIcon size="small"/>
        </Stack>
            <Grid container spacing={2}>
                
            {initialValues.map(i =>
                 {return (<SamplePropertyInput name={i.name}/>)})}

            </Grid>
        </Stack>
    )
}