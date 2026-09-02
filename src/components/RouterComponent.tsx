import { Button, Drawer, List, ListItem, ListItemText, Stack } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { AbsorptionCalcPage } from "../pages/AbsorptionCalcs";

import { Navbar } from "@diamondlightsource/sci-react-ui";
import { SampleBuilderPage } from "../pages/SampleBuilder";
import { PlaceholderPage } from "../pages/Placeholder";
import { SampleBuilderMenu } from "./SampleBuilderMenu";
import { MassRatioInputFields } from "./SampleBuilderComponents/MassRatioInputComponent";

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
        <Route path="/" element={<AbsorptionCalcPage/>} />
        <Route path="/sample-builder" element={<SampleBuilderPage/>} />
        <Route path="/sample-builder/formula-from-mass-ratios" 
                    element={<div>
                            <SampleBuilderMenu/>
                            <MassRatioInputFields/>
                            </div>}/>
        <Route path="/placeholder"
                    element={<div>
                            <SampleBuilderMenu/>
                            <PlaceholderPage/>
                            </div>}/>
      </Routes>
      </Stack>
    </BrowserRouter>
  

    )
}