// sample builder to have options: 

import { Button, ListItemText, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";


export function SampleBuilderPage () {

    const [open, setOpen] = useState<boolean>(false)
    
        const toggleMenu = (val:boolean) => () => {setOpen(val)};

    return (
        <Stack>
        <Stack direction="row">
        Sample Mass Page
        </Stack>

        <Stack>
            <Button open={open} onClick={toggleMenu(true)}>Method

            </Button>
        <Menu open={open} onClick={toggleMenu(false)}>
            <MenuItem onClick={toggleMenu(false)}>
                <Link to="/sample-builder/mass-ratios">
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

        </Stack>
    )
}