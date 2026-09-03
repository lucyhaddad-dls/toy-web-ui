// sample builder to have options: 

import { Button, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useContext, useState, type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import { MultiSampleContext } from "../context/MultiSampleProvider";


export function SampleBuilderPage () {

    const { 
        sampleList,
        focusedSample, setFocusedSample
      } = useContext(MultiSampleContext)

    const [open, setOpen] = useState<boolean>(false)
    const [sampleOpen, setSampleOpen] = useState<boolean>(false)
    
    const toggleMenu = (val:boolean) => () => {setOpen(val)};
    const toggleSampleMenu = (val:boolean) => () => {getSampleNames();setSampleOpen(val)};

    
      // should be moved to provider!?
    const getSampleNames = () => {
        const out = [""]
        if (sampleList.length > 0){
            sampleList.map(tmp => {
                if (Object.hasOwn(tmp, "values")){
                    const formula = tmp.values.filter(i => i.name == "formula")[0].value.val
                    if (formula != null){
                        out.push(formula)
                    } 
                }
            })
        }
        setSampleNames(out)
    }

    const [sampleNames, setSampleNames] = useState<string[]>([""])

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
                return (<MenuItem>{name}</MenuItem> )} )}
        </Menu>
        </Stack>

    )
}