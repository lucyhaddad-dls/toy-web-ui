import { Box, Button, Grid, Popper } from "@mui/material";
import React, { useState } from "react";
import { PopUpBuilderPage } from "./MassRatioPopup";


function SampleMakerPopUp () {
    
    const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null);
    const [titleText, setTitleText] = useState("Make New Sample")

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null: event.currentTarget)
        if (!open){setTitleText("Close")} 
        else 
            {setTitleText("Make New Sample")}
    };

    const open = Boolean(anchorEl)
    const id = open ? "sample-maker-popper": undefined;

    return (

        <div>
        <Button 
            variant="contained"
            onClick={onClick}
            aria-describedby={id}>
                {titleText}
        </Button>
        <Popper id={id} 
                open={open} 
                anchorEl={anchorEl}>
        <Box sx={{ border:1, p:1, bgcolor:"secondary" }}>
            <PopUpBuilderPage/>
        </Box>  
        </Popper>
        </div>
    )
}

export function TestSamplePage () {

    return (
        <Grid>
            <SampleMakerPopUp/>
        </Grid>
        
    )
}