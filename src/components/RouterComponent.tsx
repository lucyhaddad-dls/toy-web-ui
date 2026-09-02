import { Button, Drawer, List, ListItem, ListItemText, Stack } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Navbar } from "@diamondlightsource/sci-react-ui";
import { PlaceholderPage } from "../pages/Placeholder";
import { SampleBuilderPage } from "../pages/SampleBuilder";
import { MassRatioPage } from "../pages/FormulaFromMassRatios";

const LinkList = (
    <Stack>
        <List>
            <ListItem key={"home"}>
                <Link to = "/">
                <ListItemText>
                    Home (placeholder)
                </ListItemText>
                </Link>
            </ListItem>
            <ListItem key={"builder"}>
                <Link to="/placeholder">
               <ListItemText>
                Sample Builder
               </ListItemText>
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
        <Stack direction="row">
            <Navbar sx={{backgroundColor: "primary",
                         color: "primary",
                         width: '100%'
                         }}>
                <Button onClick={toggleDrawer(true)}
                        variant="contained"
                        sx={{ backgroundColor: "inherit",
                            color: "inherit" ,
                            flexShrink: 1}}>
                        Open Menu
                </Button>
            </Navbar>
                    
        </Stack>
        <Stack>
        <Drawer open={showMenu} onClose={toggleDrawer(false)}>
                {LinkList}
        </Drawer>
        
        </Stack>
        <Routes>
        <Route path="/" element  = {<div><PlaceholderPage/></div>}/>
        <Route path="/placeholder"
                    element={<div>
                            <SampleBuilderPage/>
                            <PlaceholderPage/>
                            </div>}/>
        <Route path="/sample-builder/mass-ratios"
                element={<div>
                    <SampleBuilderPage/>
                    <MassRatioPage/>
                    </div>}>
        </Route>
      </Routes>
      </Stack>
    </BrowserRouter>
    )
}