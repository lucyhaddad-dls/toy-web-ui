import { Box, Button, Popper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Fade from "@mui/material/Fade";

export function SetNameBox(props: {onName:(name: string) => void}) {
    const [open, setOpen] = useState<boolean>(false)
    
    const onClick = () => {
        setOpen(!open)

    }

    return (
        <Stack>
            <Button variant="contained" sx={{bgcolor:"#277932"}}
            onClick = {onClick}>Save Current Sample?</Button>

            <Popper id = "0" open={open}
            style={{ position: 'fixed',
             bottom: "50%", right: "50%", 
             top: 'unset', left: 'unset' }}>
           <Fade in={open}>
            <Box sx={{ border:1, p:1, bgcolor:"#fefefe" }}>
            <TextField label="Sample Name: "
            onKeyUp = {(event) => {if(event.key == "Enter"){
            const val = event.target as HTMLTextAreaElement
            if (val.value != ""){
            props.onName(val.value);
            onClick();
            event.preventDefault()}}}}/>
            </Box>
            </Fade>
            </Popper>
    
        </Stack>
    )

}