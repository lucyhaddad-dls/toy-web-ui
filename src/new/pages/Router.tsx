import { Navbar } from "@diamondlightsource/sci-react-ui";
import { Button, Drawer, Menu, Paper, Popper, Stack } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PlaceholderPage } from "./Placeholder";
import { LinksList } from "../components/LinkBarComponent";
import { SampleCreatePage } from "./SampleCreatePage";
import { SavedSampleList } from "../components/SavedSampleList";
import { PlotValuesPage } from "./AbsorptionPage";

export function LinkBar () {
    const [ showMenu, setShowMenu ] = useState<boolean>(false);
     
    const toggleDrawer = (newVal: boolean) => () => {setShowMenu(newVal); };

    const [ showSamples, setShowSamples ] = useState<boolean>(false);
    const [menuPos, setMenuPos] = useState<null|HTMLElement>(null);

    const toggleSampleMenu = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setShowSamples(!showSamples)
        if (showSamples == false){
            setMenuPos(null);
        }
        else {setMenuPos(ev.currentTarget)}
    }

    return (

      <Stack sx={{height:"100vh", 
           width:"100vw", justifyContent:"flex-top",
           alignContent:"space-around"}}>
         <BrowserRouter>
     
            <Stack direction="row"></Stack>
             <Stack direction="row" sx={{ minWidth:"100vw" }}>
             <Navbar sx={{backgroundColor: "primary.dark",
                              color: "primary"}}>
             <Stack direction="row" sx = {{ justifyContent:"space-between" ,
                         alignItems:"center",
                         minWidth:"80vw", }}>
             <Button onClick={toggleDrawer(true)} variant="contained" 
             sx={{ backgroundColor: "inherit",
                  color: "inherit",
                  marginLeft:"0%" }}>
                 <b>Navigation Menu</b>
             </Button>
            
                <Button variant="contained" 
                sx={{ backgroundColor: "inherit",
                            color: "inherit",
                            marginRight:"-15%" }}
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
             {LinksList}
         </Drawer>
         </Stack>
     
         <Routes>
             <Route path="/" element = {<Stack sx={{maxWidth:"100%"}}>
                                         <PlaceholderPage/>
                                         </Stack>}/>
             <Route path="/samples" element = {<Stack sx={{maxWidth:"100%"}}>
                                         <SampleCreatePage/>
                                         </Stack>}/>

            <Route path="/absorption"
            element={<Stack sx={{maxWidth:"100%"}}>
                    <PlotValuesPage/>
                    </Stack>}/>
         </Routes>
         </BrowserRouter>
     
       </Stack>

    )


}