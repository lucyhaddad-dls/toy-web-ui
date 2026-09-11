// add properties by input or formula via ratios/%'s:

import React, { useContext, useState } from "react"
import { SampleDataContext } from "../../context/SampleContext"
import { Button, Menu, MenuItem, Stack } from "@mui/material"

export function AddPropsMenu(props:{sampleName:string}) {

    const [open, setOpen] = useState<boolean>(false)
    const [position, setPosition] = useState<HTMLElement|null>(null);
    const { sampleList, } = useContext(SampleDataContext)
    const onMenuClick = (event:React.MouseEvent<HTMLElement>) => {
        setOpen(!open)
        if (open == false){
            setPosition(null)
        }
        else {setPosition(event.currentTarget)}
    }

    return (

        <Stack>
            <Button onClick={onMenuClick}>Add Props.</Button>
            <Menu open={open} onClick={onMenuClick} anchorEl={position}>
                <MenuItem>
                Add Properties 
                </MenuItem>
                <MenuItem>
                Edit Formula
                </MenuItem>
                {(sampleList.find(i => i.name == props.sampleName)?.
                values.find(i => i.name == "formula") == null) && 
          
                <MenuItem>
                Formula from Mass Ratio
                </MenuItem>
                }
            </Menu>
        </Stack>

    )

}