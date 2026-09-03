// sample builder to have options: 

import { Button, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MultiSampleContext } from "../context/SampleContext";


export function SampleBuilderPage () {

    const { sampleList } = useContext(MultiSampleContext)

    const [open, setOpen] = useState<boolean>(false)
    const [sampleOpen, setSampleOpen] = useState<boolean>(false)
    
    const toggleMenu = (val:boolean) => () => {setOpen(val)};
    const toggleSampleMenu = (val:boolean) => () => {getSampleNames();setSampleOpen(val)};

    const [sampleNames, setSampleNames] = useState<string[]>([""])

      // should be moved to provider!? AND change to use tmp.name instead!
    const getSampleNames = () => {
        const out = [""]
        console.log(sampleList.map(i => i.name))
        if (sampleList.length > 0){
            sampleList.map(i => out.push(i.name))
        }
        setSampleNames(out)
    }

    

    return (
     
    <Stack>
    
         <Stack direction="row" 
                sx = {{alignItems: "flex-start", 
                justifyContent:"space-between" }}>
            
        <Stack direction="row">
            <Typography variant="h5">Sample Builder</Typography>
            <Button open={open} onClick={toggleMenu(true)}>
                Method </Button>
        </Stack>
            <Button onClick={toggleSampleMenu(true)}>Saved Samples</Button>
        </Stack>

        <Menu open={open} onClick={() => toggleMenu(false)} 
            anchorOrigin={{vertical: 'top',
                        horizontal: 'left'}}
            transformOrigin=
                        {{vertical: 'top',
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

        <Menu open={sampleOpen}>
            {sampleNames.map(name => {
                return (
                <MenuItem onClick={toggleSampleMenu(false)}>
                    {name}
                </MenuItem>)} 
                )}
        </Menu>
        </Stack>

    )
}