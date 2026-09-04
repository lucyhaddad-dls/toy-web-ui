import { useContext, useState } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { ListItemIcon, ListItemText, MenuItem,
 MenuList, Paper, Stack, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export function SavedSampleList (){

    const { sampleList } = useContext(MultiSampleContext)
    const [selected, setSelected] = useState<string>("")
    
    return (
    <Stack>
        <Typography variant="h5">Saved Samples</Typography>
        <Stack>
        <Paper sx = {{width: 320, maxWidth: "50%"}}>
            hello
            <MenuList>
                {sampleList.map(i => (
                <MenuItem key={i.name} role="menuitemradio"
                selected = {selected == i.name}
                onClick={() => setSelected(i.name)}>
                <ListItemIcon>
                {selected === i.name ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
                </ListItemIcon>
                <ListItemText>{i.name}</ListItemText>
                </MenuItem> )
            )}
            </MenuList>
        </Paper>
        </Stack>
    </Stack>
    )
}