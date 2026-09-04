import { Button, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";


export function SampleBuilderPage () {

    const [open, setOpen] = useState<boolean>(false)

    
    const toggleMenu = (val:boolean) => () => {setOpen(val)};


    return (
     
    <Stack>
         <Stack direction="row" 
                sx = {{alignItems: "flex-start", 
                justifyContent:"center" }}>
            
            <Typography variant="h5">Sample Builder</Typography>
  
            <Button onClick={toggleMenu(true)}>
                Method </Button>
    </Stack>

        <Menu open={open} onClick={() => toggleMenu(false)} 
            anchorOrigin={{vertical: 'top',
                        horizontal: 'left'}}
            transformOrigin=
                        {{vertical: 'top',
                        horizontal: 'right'}}>

        
            <MenuItem onClick={toggleMenu(false)}>
                <Link to="/sample-builder/mass-ratio/">
                <ListItemText>From Mass Ratios (TEST)</ListItemText>
                </Link>
            </MenuItem>
        </Menu>
        </Stack>

    )
}