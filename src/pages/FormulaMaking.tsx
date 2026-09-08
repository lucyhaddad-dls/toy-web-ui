import { Button, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";


export function SampleBuilderPage () {

    const [open, setOpen] = useState<boolean>(false)
    const [menuPosition, setMenuPosition] = useState<HTMLElement|null>(null)


    const handleMenuOpen = (event:React.MouseEvent<HTMLElement>) => {
        setOpen(!open)
        if (!open){
            setMenuPosition(event.currentTarget)
        }
        else {setMenuPosition(null)}
    }


    return (
     
    <Stack sx={{minWidth:"100%"}}>
         <Stack direction="row" 
                sx = {{alignItems: "flex-start", 
                justifyContent:"center", maxWidth:"100%"}}>
            
            <Typography variant="h5">Sample Builder</Typography>
  
            <Button onClick={handleMenuOpen}>
                Method </Button>
    </Stack>
        <Menu open={open} onClick={handleMenuOpen}
            anchorEl={menuPosition} 
            anchorOrigin={{vertical: 'bottom',
                        horizontal: 'center'}}
            transformOrigin=
                        {{vertical: 'top',
                        horizontal: 'center'}}>
        
            <MenuItem onClick={handleMenuOpen}>
                <Link to="/sample-builder/mass-ratio/">
                <ListItemText>From Mass Ratios</ListItemText>
                </Link>
            </MenuItem>
        </Menu>
        </Stack>

    )
}