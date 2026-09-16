import React, { useContext, useState } from "react";
import { SampleDataContext } from "../context/SampleContext";
import { Box, Button, Fade, Popover, Stack, TextField, Typography } from "@mui/material";
import ScienceTwoToneIcon from '@mui/icons-material/ScienceTwoTone';
import { nullSampleValues } from "../models/defaults";
import type { SampleValueResponse } from "../models/models";

export function SaveSamplePopUp(props:{saveValues:SampleValueResponse[]|null}) {
     const { addToSampleList } = useContext(SampleDataContext)

    const [open, setOpen] = useState<boolean>(false)
    const [position, setPosition] = useState<HTMLElement|null>(null)

    const onClick = (event:React.MouseEvent<HTMLElement>|null) => {
        setOpen(!open)
        if (!open && event != null){
            setPosition(event.currentTarget)
        }
        else {setPosition(null)}
    }

    const onAdd = (name:string) => {
        if (props.saveValues == null){
        addToSampleList(nullSampleValues, name)}
        else {addToSampleList(props.saveValues, name)
        }
    }

    return (
    <Stack >
        <Button variant="contained" sx={{bgcolor:"#477a51",
            minWidth:"15vw", m:1
        }}
            onClick = {onClick}>
        <Stack direction="row" spacing={1}>
        {props.saveValues == null && 
        <Stack>
        <Typography><b>Make New Sample</b></Typography>
        <ScienceTwoToneIcon/>
        </Stack>}
        {props.saveValues != null && 
        <Stack>
        <Typography><b>Save As New Sample</b></Typography>
        </Stack>}


        </Stack>
    </Button>
    <Popover id = "0" open={open} anchorEl={position}
    anchorOrigin={{ vertical: 'bottom',
                        horizontal: 'center',}}
        transformOrigin={{ vertical: 'top',
                            horizontal: 'left',}}
        onClose={()=> {onClick(null)}}>
        <Fade in={open}>
        <Box sx={{ 
            border:3, p:1, bgcolor:"white", 
            borderColor:"#477a51" }}>

        <TextField label="Sample Name: "
            onKeyUp = {(event) => {if(event.key == "Enter"){
            const val = event.target as HTMLTextAreaElement
            onClick(null)
            if (val.value != ""){
                onAdd(val.value)
            event.preventDefault()}}}}/>
            </Box>
            </Fade>
            </Popover>
    
    </Stack>
    )
}