import React, { useContext, useState } from "react";
import { SampleDataContext } from "../context/SampleContext";
import { sampleKeys, type SampleResponse, type SampleResponseKeys } from "../models/models";
import { Button, Grid, Menu, MenuItem, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { nullSampleValues } from "../models/defaults";
import { SamplePropertyInput } from "./SamplePropertyInput";

export function PhysicalPropertiesMenu (props:{name:string}) {
    
    const [open, setOpen] = useState<boolean>(false)
    const [anchor, setAnchor] = useState<null|HTMLElement>(null)

    const { getSample } = useContext(SampleDataContext)

    const [currentSample,] = useState<SampleResponse>(getSample(props.name))

  
    const toggleMenu = (event:null|React.MouseEvent<HTMLButtonElement|
        HTMLDivElement, MouseEvent>)  => {
        if (event!=null){
            setAnchor(event.currentTarget)
        }
        else {setAnchor(null)}

    setOpen(!open)
    }

    const [paramsList, setParamsList] = useState(currentSample.values.filter(i => 
        i.value.val != null || ["formula", "edge", "absorber"].includes(i.name)
    ))

    const onAddParam = (name:SampleResponseKeys) => {
        if (!paramsList.map(o => o.name).includes(name)){
        setParamsList([...paramsList, nullSampleValues.filter(i =>
                         i.name == name)[0]])}
    }

    return (
    <Stack spacing={2} sx={{m:1,}}>

    <Stack direction="row" sx={{justifyContent:"space-between"}}>
        <Typography align="center">
        <b>Current sample: {props.name}</b>

        </Typography>
        <Button variant="contained" 
        onClick={toggleMenu}>
        <Stack direction="row" sx={{justifyContent:"center"}}>
            Add Property
            <AddIcon size="small"/>
        </Stack>
        </Button>
        </Stack>

        <Stack><Menu open={open} onClick={(event)=>toggleMenu(event)}
        anchorEl={anchor}>
            {sampleKeys.map(k => {
            if (!paramsList.map(i => i.name).includes(k)){
            return (<MenuItem sx = {{minWidth:"12vw"}}
            key = {k} onClick={() => onAddParam(k)}>
                {k}</MenuItem>)
            }
        })}
        </Menu></Stack>

        <Grid key={"edit-props-grid"} spacing={2} container>
            {paramsList.map(i => {
                return (<SamplePropertyInput name={i.name} 
                    sampleId={props.name}
                key={`${i.name}-edit-grid`}
                  defaultVal={i.value.val}/>)
            })
            }

        </Grid>

    </Stack>
    )

}