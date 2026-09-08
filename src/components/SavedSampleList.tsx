import React, { useContext, useState } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { Button, ListItemIcon, Menu, MenuItem,
 MenuList, Popover, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export function SavedSampleList (){

    const { sampleList, deleteFromSampleList, setFocusedSample, getAvailableCalcs } = useContext(MultiSampleContext)

    const [hoverInfo, setHoverInfo] = useState<string[]>(["Hello!!!"]);
    const [paramsInfo, setParamsInfo] = useState<string[]>([])

    const [infoPosition, setInfoPosition] = useState<HTMLElement|null>(null);
    const [paramsPosition, setParamsPosition] = useState<HTMLElement|null>(null);

    const [addSampleOpen, setAddSampleOpen] = useState<boolean>(false);
    const [addSamplePosition, setAddSamplePosition] = useState<HTMLElement|null>(null);

    const editLink = "/sample-builder/edit"


    const handlePopovers = (event: React.MouseEvent<HTMLElement>,
         name: string | null = null, eventType: "info" | "params") => {

        let hoverName = name
        if (hoverName == null){
            hoverName = event.currentTarget.textContent}

        if (eventType == "info"){
            const valueInfo = sampleList.filter(i =>i.name == hoverName)[0]
        
            const filt =  valueInfo.values.map((k) => (`${k.name} = ${k.value.val}`))
            setHoverInfo(filt)
            setInfoPosition(event.currentTarget)
        }

        if (eventType == "params"){
            setParamsInfo(getAvailableCalcs(hoverName))
            setParamsPosition(event.currentTarget)
        }
        
         }

    const handleInfoClose = (eventType:"info"|"params") => {
        if (eventType == "info"){
        setInfoPosition(null)
        }
        if (eventType == "params"){
            setParamsPosition(null)
        }
    }

    const infoOpen = Boolean(infoPosition)
    const paramsOpen = Boolean(paramsPosition)

    const handleDeleteSample = (name:string) => {
         deleteFromSampleList(name) 
    
    }


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
        <Typography sx = {{ fontSize:".9rem" }}>{i.name}</Typography>

    
    <Button size="small" variant="contained">
        <Link to={editLink} onClick={()=>handleLinkClicked(i.name)}>


        <Typography sx={{color:"#f3f3f3"}}
        aria-owns={infoOpen ? 'show-info' : undefined}
            aria-haspopup="true"
            onMouseEnter=
            {(event: React.MouseEvent<HTMLElement>) => 
                handlePopovers(event, i.name, "info")}
            onMouseLeave = {() => handleInfoClose("info")}
        >Edit Properties</Typography>
        </Link>
    </Button>

    <Button size="small" variant="contained">
    <Link to = "/sample-builder/calculate"
    onClick={()=>handleLinkClicked(i.name)}>
        <Typography sx={{color:"#f3f3f3"}}
        aria-owns={paramsOpen ? 'show-params' : undefined}
            aria-haspopup="true"
            onMouseEnter={(event: React.MouseEvent<HTMLElement>) =>
                 handlePopovers(event, i.name, "params")}
            onMouseLeave={()=>handleInfoClose("params")}
        >Calculate</Typography>
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
        onClose={()=>handleInfoClose("info")}
        disableRestoreFocus >
        <Typography sx={{ p:0.5 ,fontSize: '0.8rem'}}>
            <b>Current Properties</b>
        </Typography>
            {hoverInfo.map(i =>
            <Typography sx={{ p:0.5 ,fontSize: '0.8rem'}} key={i}>
                {i}</Typography>)}
      </Popover>

      <Popover
      id="show-params"
      sx ={{pointerEvents: "none"}}
      open={paramsOpen}
      anchorEl={paramsPosition}
      anchorOrigin={{ vertical: 'bottom',
                        horizontal: 'left',}}
        transformOrigin={{ vertical: 'top',
                            horizontal: 'left',}}
        onClose={()=>handleInfoClose("params")}
        disableRestoreFocus >
        <Typography sx={{ p:0.5 ,fontSize: '0.8rem'}}>
            <b>Available To Calculate</b>
        </Typography>
            {paramsInfo.map(i =>
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