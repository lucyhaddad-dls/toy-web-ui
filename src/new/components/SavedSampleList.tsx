import React, { useContext, useState } from "react";
import { ListItemIcon, Menu, MenuItem,
 MenuList, Popover, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { SampleDataContext } from "../../context/SampleContext";
import { NameSamplePopUp } from "./NameSamplePopup";

export function SavedSampleList (){

    const { sampleList, deleteFromSampleList, getSample} = useContext(SampleDataContext)

    const [hoverInfo, setHoverInfo] = useState<string[]>([]);

    const [infoPosition, setInfoPosition] = useState<HTMLElement|null>(null);

    const [addSampleOpen, setAddSampleOpen] = useState<boolean>(false);
    const [addSamplePosition, setAddSamplePosition] = useState<HTMLElement|null>(null);


    const handlePopovers = (event: React.MouseEvent<HTMLElement>,
         name: string | null = null) => {

        let hoverName = name
        if (hoverName == null){
            hoverName = event.currentTarget.textContent}

        const valueInfo = getSample(hoverName)

        const filt =  valueInfo.values.map((k) => (`${k.name} = ${k.value.val}`))
        setHoverInfo(filt)
        setInfoPosition(event.currentTarget)
        
         }

    const handleInfoClose = () => {

        setInfoPosition(null)
    
    }

    const infoOpen = Boolean(infoPosition)

    const handleDeleteSample = (name:string) => {
         deleteFromSampleList(name) 
    
    }

    const handleAddMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAddSampleOpen(!addSampleOpen)
        if (!addSampleOpen){
        setAddSamplePosition(event.currentTarget)}
        else {setAddSamplePosition(null)}
    }

    return (

    <Stack>
    <Typography align="center"><b>Saved Samples</b></Typography>
    <MenuList dense >
                {sampleList.map(i => (
    <MenuItem key={i.name}>
        <Stack direction="row" spacing={2} 
        sx={{justifyContent: "space-around", alignItems: "center", }}>
        <Typography sx = {{ fontSize:".9rem" }}
        aria-owns={infoOpen ? 'show-info' : undefined}
            aria-haspopup="true"
            onMouseEnter=
            {(event: React.MouseEvent<HTMLElement>) => 
                handlePopovers(event, i.name)}
            onMouseLeave = {() => handleInfoClose()}>
        {i.name}</Typography>
   
   
        <ListItemIcon
        onClick={() => handleDeleteSample(i.name)}>
            <DeleteOutlineOutlinedIcon/>
        </ListItemIcon>

     <Popover
        id="show-info"
        sx={{ pointerEvents: 'none' }}
        open={infoOpen}
        anchorEl={infoPosition}
        anchorOrigin={{ vertical: 'bottom',
                        horizontal: 'left',}}
        transformOrigin={{ vertical: 'top',
                            horizontal: 'left',}}
        onClose={()=>handleInfoClose()}
        disableRestoreFocus >
        <Typography sx={{ p:0.5 ,fontSize: '0.8rem'}}>
            <b>Current Properties</b>
        </Typography>
            {hoverInfo.map(i =>
            <Typography sx={{ p:0.5 ,fontSize: '0.8rem'}} key={i}>
                {i}</Typography>)}
      </Popover>
    </Stack>
    </MenuItem> 
    ))}
    </MenuList>

        <NameSamplePopUp/>
 
    <Menu id={"addSampleMenu"}
    open = {addSampleOpen}
    onClick={handleAddMenuClick}
    anchorEl={addSamplePosition}
     anchorOrigin={{ vertical: 'bottom',
                        horizontal: 'right',}}
    transformOrigin={{ vertical: 'top',
                            horizontal: 'left',}}
    disableRestoreFocus>
    </Menu>
  </Stack>

    )
}