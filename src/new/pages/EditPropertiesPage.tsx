import { useContext, useState } from "react";
import { SampleDataContext } from "../../context/SampleContext";
import { Button, Grid, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { nullSampleValues } from "../../models/defaults";
import { SamplePropertyInput } from "../components/SamplePropertyInput";
import AddIcon from '@mui/icons-material/Add';
import { sampleKeys } from "../../models/models";

export function EditPropertiesPage () {
    const { sampleList, currentName } = useContext(SampleDataContext)

    const [addMenuOpen, setAddMenuOpen] = useState<boolean>(false)
    const [ menuAnchor, setMenuAnchor ] = useState<null | HTMLElement>(null);

    let currentSample = sampleList.find(i => i.name == currentName)
    if (currentSample == undefined){
        currentSample = {name:currentName as string,
             values:nullSampleValues}
    }

    const toggleAddMenu = (event:null|React.MouseEvent<HTMLButtonElement>=null) => {
        if (event!=null){
            setMenuAnchor(event.currentTarget)
        }
        else {setMenuAnchor(null)}
    
        setAddMenuOpen(!addMenuOpen)
    } 


    let initialValues = currentSample.values.filter(i => i.value.val!=null)

    if (!initialValues.map(i =>i.name).includes("formula")){
        initialValues = [{name:"formula", value:{val:"", dtype:"str"}}, ...initialValues]
    }
    if (!initialValues.map(i =>i.name).includes("absorber")){
        initialValues = [...initialValues, {name:"absorber", value:{val:"", dtype:"str"}},]
    }
    
    if (!initialValues.map(i =>i.name).includes("edge")){
        initialValues = [...initialValues, {name:"edge", value:{val:"", dtype:"str"}},]
    }
    

    return (
        <Stack spacing={2} sx={{m:1,}}>

        <Stack direction="row" sx={{justifyContent:"space-between"}}>
        <Typography align="center">
        <b>Current sample: {currentName}</b>
        </Typography>
        <Button variant="contained" 
        onClick={toggleAddMenu}>
        <Stack direction="row" sx={{justifyContent:"center"}}>
            Add Property
            <AddIcon size="small"/>
        </Stack>
        </Button>
        </Stack>

        <Stack>
        <Menu open={addMenuOpen} onClick={()=>toggleAddMenu()}
        anchorEl={menuAnchor}>
        {sampleKeys.map(k => {
            if (!initialValues.map(i => i.name).includes(k)){
       
            return (<MenuItem sx = {{minWidth:"12vw"}}
            key = {k}>
                {k}</MenuItem>)
            }
        })}
        </Menu>
        </Stack>
            <Grid container spacing={2}>
                
            {initialValues.map(i =>
                 {return (<SamplePropertyInput name={i.name}
                  key={`${i.name}-edit-grid`}
                  defaultVal={i.value.val}/>)
                  })}

            </Grid>
        </Stack>
    )
}