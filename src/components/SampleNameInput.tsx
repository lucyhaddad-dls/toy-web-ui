import { Box, Button, Popper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Fade from "@mui/material/Fade";

export function SetNameBox(props: {onName:(name: string) => void}) {
    const [open, setOpen] = useState<boolean>(false)
    const [menuPosition, setMenuPosition] = useState<HTMLElement|null>(null)


    const onClick = (event: React.MouseEvent<HTMLElement>|null) => {
        setOpen(!open)
        if (!open && event !=null){
            setMenuPosition(event.currentTarget)
        }
        else {setMenuPosition(null)}

    }

    return (
        <Stack >
            <Button variant="contained" sx={{bgcolor:"#477a51"}}
            onClick = {onClick}>Save as New Sample</Button>
            <Popper id = "0" open={open}
            anchorEl={menuPosition}
            placement="right">
           <Fade in={open}>
            <Box
             sx={{ border:1, p:1, bgcolor:"white",
              borderColor:"#477a51"}} >
            <TextField label="Sample Name: "
            onKeyUp = {(event) => {if(event.key == "Enter"){
            const val = event.target as HTMLTextAreaElement
            onClick(null)
            if (val.value != ""){
            props.onName(val.value);
            event.preventDefault()}}}}/>
            </Box>
            </Fade>
            </Popper>
    
        </Stack>
    )

}