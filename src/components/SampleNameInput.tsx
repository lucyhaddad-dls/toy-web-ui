import { Box, Button, Popper, TextField } from "@mui/material";
import { useState } from "react";


export function NameSamplePopUp(props: {onName:(name: string) => void}) {
    const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null);
    const open = Boolean(anchorEl)
    const id = open ? "name-sample-popper": undefined;


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
            onKeyUp = {(event) => {if(event.key == "Enter"){
            const val = event.target as HTMLTextAreaElement
            if (val.value != ""){
            props.onName(val.value);
            setAnchorEl(null)}
            event.preventDefault();}}
            
            }>
        </TextField>
        </Box>  
        </Popper>
        </div>
    )

}