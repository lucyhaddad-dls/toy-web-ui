// sample builder to have options: 

import { Box, Button, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";


export function SampleBuilderPage () {

    const [open, setOpen] = useState<boolean>(false)
    
    const toggleMenu = (val:boolean) => () => {setOpen(val)};

    return (
        <Stack sx={{ alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
        <Typography >Sample Builder</Typography>
        </Box>
       
            <Button open={open} onClick={toggleMenu(true)}>Method
            </Button>
        <Menu open={open} onClick={toggleMenu(false)} 
            anchorOrigin={{vertical: 'top',
                        horizontal: 'center'}}
            transformOrigin=
                        {{vertical: 'center',
                        horizontal: 'right'}}>

            <MenuItem onClick={toggleMenu(false)}>
                <Link to="/sample-builder/mass-ratios">
                <ListItemText>From Mass Ratios</ListItemText>
                </Link>
            </MenuItem>
            <MenuItem onClick={toggleMenu(false)}>
                <Link to="/sample-builder/test">
                <ListItemText>From Mass Ratios (TEST)</ListItemText>
                </Link>
            </MenuItem>
        </Menu>
        </Stack>
    )
}