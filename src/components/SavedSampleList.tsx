import React, { useContext, useState } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { Button, ListItemIcon, Menu, MenuItem,
 MenuList, Popover, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export function SavedSampleList (){

    const { sampleList, deleteFromSampleList, setFocusedSample } = useContext(MultiSampleContext)

    const [hoverInfo, setHoverInfo] = useState<string[]>(["Hello!!!"]);

    const [infoPosition, setInfoPosition] = useState<HTMLElement|null>(null);

    const [addSampleOpen, setAddSampleOpen] = useState<boolean>(false);
    const [addSamplePosition, setAddSamplePosition] = useState<HTMLElement|null>(null);

    const editLink = "/sample-builder/edit"

    const handleInfoOpen = (event: React.MouseEvent<HTMLElement>) => {
       
        const hoverName = event.currentTarget.textContent
        const valueInfo = sampleList.filter(i =>i.name == hoverName)[0]
        
        const filt = 
            valueInfo.values.map((k) =>
        (`${k.name} = ${k.value.val}`))
        setHoverInfo(filt)
        setInfoPosition(event.currentTarget)
    }

    const handleInfoClose = () => {
        setInfoPosition(null)
    }

    const infoOpen = Boolean(infoPosition)

    const handleDeleteSample = (name:string
    ) => { deleteFromSampleList(name) }


    const handleLinkClicked = (name:string) => {
        const sample = sampleList.filter(i => i.name == name)[0]
        setFocusedSample(sample)
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
        <Typography aria-owns={infoOpen ? 'show-info' : undefined}
            aria-haspopup="true"
            onMouseEnter={handleInfoOpen}
            onMouseLeave={handleInfoClose}
            sx = {{ fontSize:".9rem" }}
            >{i.name}</Typography>

    
    <Button size="small" variant="contained">
        <Link to={editLink} onClick={()=>handleLinkClicked(i.name)}>
        <Typography sx={{color:"#f3f3f3"}}>Edit Properties</Typography>
        </Link>
    </Button>
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
        onClose={handleInfoClose}
        disableRestoreFocus >
            {hoverInfo.map(i =>
            <Typography sx={{ p:0.5 ,fontSize: '0.8rem'}} key={i}>
                {i}</Typography>)}
      </Popover>
    </Stack>
    </MenuItem> 
    ))}
    </MenuList>

    <Button variant="contained" sx={{bgcolor:"#477a51"}}
    onClick={handleAddMenuClick}
    >
    <Stack sx={{alignContent:"center",
     justifyContent:"space-between",}}
     direction="row" spacing={1}>
        <Typography>Create New Sample</Typography>
        <AddIcon fontSize="small"/>
    </Stack>

    </Button>
    <Menu id={"addSampleMenu"}
    open = {addSampleOpen}
    onClick={handleAddMenuClick}
    anchorEl={addSamplePosition}
     anchorOrigin={{ vertical: 'bottom',
                        horizontal: 'right',}}
    transformOrigin={{ vertical: 'top',
                            horizontal: 'left',}}
    disableRestoreFocus>
    <Stack sx={{bgcolor:"grey"}}>
    <MenuItem sx={{bgcolor:"#477a51", color:"white"}}>
    <Link to="/sample-builder/mass-ratio"><Typography sx={{color:"white"}}>
        From Mass Ratios</Typography></Link>
    </MenuItem>
    <MenuItem sx={{bgcolor:"#477a51", color:"white"}}>
    <Link to="/sample-builder/edit"><Typography sx={{color:"white"}}>
        From Formula</Typography>
    </Link>
    </MenuItem>
    </Stack>
    </Menu>
  </Stack>

    )
}