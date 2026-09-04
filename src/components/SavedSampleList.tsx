import { useContext, useState } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { Button, ListItemIcon, MenuItem,
 MenuList, Paper, Popover, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom";

export function SavedSampleList (){

    const { sampleList, deleteFromSampleList } = useContext(MultiSampleContext)

    const [hoverInfo, setHoverInfo] = useState<string[]>(["Hello!!!"])

    const [infoPosition, setInfoPosition] = useState<HTMLElement|null>(null);

    const editLink = "/placeholder"

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


    
    return (

    <Stack >
        <Paper sx = {{width: 320, maxWidth: "90%", justifyContent:"center"}} >
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
        <Link to={editLink}>
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
    </MenuItem> )   )}
            </MenuList>
        </Paper>
    </Stack>

    )
}