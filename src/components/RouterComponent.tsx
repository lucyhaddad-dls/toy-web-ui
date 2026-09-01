import { Button, Drawer, List, ListItem, ListItemText, Stack } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { AbsorptionCalcPage } from "../pages/AbsorptionCalcs";
import { PlaceholderPage } from "../pages/Placeholder";

const LinkList = (
    <Stack>
        <List>
            <ListItem key={"home"}>
                <Link  to="/"> 
                <ListItemText>Sample Mass (Home) </ListItemText>
                </Link>
            </ListItem>

            <ListItem key={"sample"}>
                <Link  to="/sample-builder"> 
                <ListItemText>Sample Builder </ListItemText>
                </Link>
            </ListItem>
        </List>
    </Stack>
)

export function LinkDrawer () {
    const [ showMenu, setShowMenu ] = useState<boolean>(false);

    const toggleDrawer = (newVal: boolean) => () =>
        {setShowMenu(newVal); };

    return (
        <BrowserRouter>
        <Stack>
            
        <Button onClick={toggleDrawer(true)}>
                Open Menu
        </Button>

        <Drawer open={showMenu} onClose={toggleDrawer(false)}>
                {LinkList}
        </Drawer>
        
        </Stack>
        <Routes>
        <Route path="/" element={<AbsorptionCalcPage/>} />
        <Route path="/sample-builder" element={<PlaceholderPage/>} />
      </Routes>
    </BrowserRouter>

    )
}