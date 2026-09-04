import { Button, Drawer, List, ListItem, ListItemText, Menu, Paper, Popper, Stack } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Navbar } from "@diamondlightsource/sci-react-ui/navigation";
import { PlaceholderPage } from "../pages/Placeholder";
import { SampleBuilderPage } from "../pages/FormulaMaking";
import { MassRatioBuilderPage } from "../pages/SampleMaker";
import { EditSamplePage } from "../pages/EditPropertiesPage";
import { SavedSampleList } from "./SavedSampleList";



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
            <ListItem key={"builder-formula-massRatio"}>
                <Link to="sample-builder/mass-ratio">
               <ListItemText>
                Sample Builder
               </ListItemText>
                </Link>
            </ListItem>
            <ListItem key={"builder-edit"}>
                <Link to="sample-builder/edit">
                <ListItemText>
                Sample Editor
                </ListItemText>
                </Link>
            </ListItem>
          
        </List>
    </Stack>
)

export function LinkDrawer () {

    const [ showMenu, setShowMenu ] = useState<boolean>(false);

    const [ showSamples, setShowSamples ] = useState<boolean>(false);
    const [menuPos, setMenuPos] = useState<null|HTMLElement>(null);

    const toggleDrawer = (newVal: boolean) => () =>
        {setShowMenu(newVal); };

    const toggleSampleMenu = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setShowSamples(!showSamples)
        if (showSamples == false){
            setMenuPos(null);
        }
        else {setMenuPos(ev.currentTarget)}
    }

    return (
        <Stack direction="row">
        <BrowserRouter>
            <Stack>
        <Stack direction="row" sx={{ minWidth:"100vw" }}>
            <Navbar sx={{backgroundColor: "primary",
                         color: "primary"}}>
                <Stack direction="row"
                 sx = {{ justifyContent:"space-between" ,
                    alignItems:"center",
                    minWidth:"80vw",
                 }}>
                <Button onClick={toggleDrawer(true)}
                        variant="contained"
                        sx={{ backgroundColor: "inherit",
                            color: "inherit",
                            marginLeft:"20px" }}>
                        <b>Nav Menu</b>
                </Button>

                <Button variant="contained" 
                sx={{ backgroundColor: "inherit",
                            color: "inherit",
                            marginRight:"60px" }}
                onClick={toggleSampleMenu}>
                    <b>Sample List</b>
                    </Button>
                <Popper open={showSamples}
                anchorEl={menuPos}
                role={undefined} disablePortal>
                <Paper>
                    <Menu open={showSamples}
                anchorOrigin={{vertical: 'top',
                               horizontal: 'right'}}
                transformOrigin={{vertical: 'top',
                                  horizontal: 'right'}}
                onClose={toggleSampleMenu}>
                    <SavedSampleList/>
                </Menu>
                </Paper>
                </Popper>
        
                </Stack>
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

        <Route path="sample-builder/mass-ratio"
                element = {<div><SampleBuilderPage/>
                            <MassRatioBuilderPage/>
                            </div>}/>
        <Route path="sample-builder/edit"
        element = {<div><EditSamplePage/></div>}/>
      </Routes>
      </Stack>

    </BrowserRouter>

    </Stack>
    )
}