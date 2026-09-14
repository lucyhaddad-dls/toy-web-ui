// add properties by input or formula via ratios/%'s:

import React, { useContext, useState } from "react"
import { SampleDataContext } from "../../context/SampleContext"
import { Box, Button, Menu, MenuItem, Popover, Stack } from "@mui/material"
import { PhysicalPropertiesMenu } from "./PhysicalPropertiesMenu"


export function AddPropsMenu(props:{sampleName:string}) {

    const [open, setOpen] = useState<boolean>(false)
    const {sampleList } = useContext(SampleDataContext)
    const [top, setTop] = useState<number>(0)
    const [left, setLeft] = useState<number>(0)

    const currentVals = sampleList.find(i => i.name == props.sampleName)?.values.
    find(v => v.name == "formula")

    const onMenuClick = (event:React.MouseEvent<HTMLElement>) => {
        setOpen(!open)

        setTop(event.clientY)
        setLeft(event.clientX)}

    const [popOpen, setPopOpen] = useState<boolean>(false)
    const [popXY, setPopXY] = useState<HTMLElement|null>(null)

    const onPopClick = (event:React.MouseEvent<HTMLElement>|null) => {
        setPopOpen(!popOpen)
        if (!open && event!=null){
            setPopXY(event.currentTarget)
        }
        else {setPopXY(null)}
    }
    
    
    return (

        <Stack>
            <Button onClick={onMenuClick}>Add Props.</Button>
            <Menu open={open} onClick={onMenuClick}
            anchorReference="anchorPosition"
            anchorPosition={{ top: top, left: left }}>
            <Stack>
            <MenuItem
            onClick = {(event:React.MouseEvent<HTMLElement>) =>
             { onPopClick(event)}}>
                Add Physical Properties
            </MenuItem>
            {(currentVals?.value.val == null) && 
            <MenuItem>Formula from Mass Ratio</MenuItem>}
            </Stack>
            </Menu>


        <Popover id="1" open={popOpen} anchorEl={popXY}
        onClose={()=>onPopClick(null)}
        anchorOrigin={{ vertical: 'center',
                        horizontal: 'center',}}
        transformOrigin={{ vertical: 'top',
                            horizontal: 'center',}}>
        <Box sx = {{border:3, p:1, bgcolor:"primary.light"}}>
            <PhysicalPropertiesMenu name={props.sampleName}/>
        </Box>
        
        </Popover>

        </Stack>

    )

}