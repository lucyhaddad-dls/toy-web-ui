import { useContext, useState } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { ListItemIcon, MenuItem,
 MenuList, Paper, Popover, Stack, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export function SavedSampleList (){

    const { sampleList, deleteFromSampleList, setSampleList } = useContext(MultiSampleContext)
    const [selected, setSelected] = useState<string>("")

    const [hoverInfo, setHoverInfo] = useState<string[]>(["Hello!!!"])

    const [infoPosition, setInfoPosition] = useState<HTMLElement|null>(null);

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
        <Paper sx = {{width: 320, maxWidth: "50%", justifyContent:"center"}} >
            Saved samples 
            <MenuList dense >
                {sampleList.map(i => (
    <MenuItem key={i.name} role="menuitemradio"
                selected = {selected == i.name}
                onClick={() => setSelected(i.name)}
                >
        <ListItemIcon>
            {selected === i.name ? (
                <FavoriteIcon fontSize="small" />
              ) : (  <FavoriteBorderIcon fontSize="small" /> )}
        </ListItemIcon>
        <Typography aria-owns={infoOpen ? 'show-info' : undefined}
            aria-haspopup="true"
            onMouseEnter={handleInfoOpen}
            onMouseLeave={handleInfoClose}
            sx = {{ fontSize:".9rem" }}
            >{i.name}</Typography>

        <ListItemIcon sx={{ justifyContent:"flex-end"}}
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

    </MenuItem> )   )}
            </MenuList>
        </Paper>
    </Stack>

    )
}