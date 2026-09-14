import React, { useContext, useState } from "react";
import { SampleDataContext } from "../../context/SampleContext";
import { sampleKeys, type SampleResponse, type SampleResponseKeys } from "../../models/models";
import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { nullSampleValues } from "../../models/defaults";

export function PhysicalPropertiesMenu () {
    
    const [open, setOpen] = useState<boolean>(false)
    const [anchor, setAnchor] = useState<null|HTMLElement>(null)

    const {sampleList, currentName} = useContext(SampleDataContext)

    const [currentSample,] = useState<SampleResponse>(currentName!=null ? sampleList.
        filter(i => i.name = currentName)[0] : {name:"", values:nullSampleValues})

    const toggleMenu = (event:null|React.MouseEvent<HTMLButtonElement>)  => {
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

    // make popover!
        <Stack spacing={2} sx={{m:1,}}>

            <Stack direction="row" sx={{justifyContent:"space-between"}}>
        <Typography align="center">
        <b>Current sample: {currentName}</b>

        </Typography>
        <Button variant="contained" 
        onClick={toggleMenu}>
        <Stack direction="row" sx={{justifyContent:"center"}}>
            Add Property
            <AddIcon size="small"/>
        </Stack>
        </Button>
        </Stack>

        <Stack>
        <Menu open={open} onClick={()=>toggleMenu(null)}
        anchorEl={anchor}>
        {sampleKeys.map(i=> {
            if (!paramsList.map(s => s.name).includes(i)){
            return (<MenuItem sx={{minWidth:"12vw"}}
                onClick = {onAddParam(i)}>
                {i}</MenuItem>)}
        })}
        </Menu>
        </Stack>

        </Stack>
    )

}