import { Button, ListItemText, Menu, Stack, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";


export function SampleBuilderMenu () {

    const [open, setOpen] = useState<boolean>(false)

    const toggleMenu = (val:boolean) => () => {

        setOpen(val)
    };

    return (
        <Stack>
            <Button onClick={toggleMenu(true)}>
                Sample Building Method
            </Button>
            <Menu open={open} onClick={toggleMenu(false)}>
            <MenuItem>
            <Link to="/sample-builder/formula-from-mass-ratios">
               <ListItemText>From Mass Ratios</ListItemText>
               </Link>
            </MenuItem>
            <MenuItem onClick={toggleMenu(false)}>
             <Link to="/placeholder">
               <ListItemText>Placeholder</ListItemText>
               </Link>
            </MenuItem>
            </Menu>
        </Stack>
    )
}