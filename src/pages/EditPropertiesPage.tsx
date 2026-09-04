import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { Link } from "react-router-dom";
import { sampleKeys } from "../models/models";
import AddIcon from '@mui/icons-material/Add';

export function EditSamplePage() {

    const { focusedSample } = useContext(MultiSampleContext)
    
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const [ menuAnchor, setMenuAnchor ] = useState<null | HTMLElement>(null);

    const toggleMenu = (event:null|React.MouseEvent<HTMLButtonElement>=null) => {
        if (event!=null){
            setMenuAnchor(event.currentTarget)}
        else {setMenuAnchor(null)}

        setMenuOpen(!menuOpen)
    }

    if (focusedSample.name == "_"){
        return (
            <Stack>
                <Typography align="center">
                     Sample list is empty! ...
                </Typography>
                <Typography align="center">
                    
                    Make a sample at (one of) the page(s) here:
                <Typography>
                    <Link to = "/sample-builder/mass-ratio">
                    Via Mass-Ratios</Link>
            </Typography>
                </Typography></Stack>
        )
    }

    else {
    return (
        <Stack >
            <Typography align="center">Hello !! edit sample here. </Typography>
                <Stack sx={{alignContent:"center", 
                    justifyContent:"center"}}>
              
                    <Typography align="center">
                        <b>{focusedSample.name}</b>
                        </Typography>
                <Typography align="center">
                {focusedSample.values.map((k) => 
                    `${k.name} = ${k.value.val}, `)}
                    </Typography>
                </Stack>

           <Stack sx = {{maxWidth:"15%", marginLeft:"2%"}}>
            <Button variant="contained" 
            sx = {{ bgcolor:"#337e42"}}
            onClick={(event)=>toggleMenu(event)}>
            <Stack direction="row" sx = {{ alignContent:"center",
                justifyContent:"center"
            }}>
                Add new property
            <Stack  sx = {{ alignContent:"center",
                justifyContent:"center"}}><AddIcon/> </Stack>
            </Stack>
            </Button>

           <Menu open={menuOpen} onClick={() => toggleMenu()}
            anchorEl={menuAnchor}>
            {sampleKeys.filter(i => i!="formula").map( i => (
                <MenuItem>{i}</MenuItem>
            ) )}
           </Menu>
           </Stack>
        </Stack>
    )
    }
}