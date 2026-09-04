import { Box, Button, Popper, TextField } from "@mui/material";
import { useState } from "react";

export function NameSamplePopUp(props: {defaultName:string, onName:(name: string) => void}) {
    const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null);
    const open = Boolean(anchorEl)
    const id = open ? "name-sample-popper": undefined;

    const [name, setName] = useState<string>(props.defaultName)

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null: event.currentTarget)
    }

    return (
        <div>
            <Button variant="contained" sx={{bgcolor:"#277932"}}
            onClick = {onClick}>Save Current Sample?</Button>
        <Popper id={id} 
                open={open} 
                anchorEl={anchorEl}>
        <Box sx={{ border:1, p:1, bgcolor:"#fefefe" }}>
        <TextField label="Sample Name: " 
        defaultValue={props.defaultName}
            onKeyUp = {(event) => {if(event.key == "Enter"){
            const val = event.target as HTMLTextAreaElement
            setName(val.value)
            props.onName(name); setAnchorEl(null)}
            event.preventDefault();}
            
            
            }> {props.defaultName}
        </TextField>
        </Box>  
        </Popper>
        </div>
    )

}