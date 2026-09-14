// add properties by input or formula via ratios/%'s:

import React, { useContext, useState } from "react"
import { SampleDataContext } from "../../context/SampleContext"
import { Button, Menu, MenuItem, Stack } from "@mui/material"

export function AddPropsMenu(props:{sampleName:string}) {

    const [open, setOpen] = useState<boolean>(false)
    const { sampleList, } = useContext(SampleDataContext)
    const [top, setTop] = useState<number>(0)
    const [left, setLeft] = useState<number>(0)

    const currentVals = sampleList.find(i => i.name == props.sampleName)?.values.
    find(v => v.name == "formula")

    const onMenuClick = (event:React.MouseEvent<HTMLElement>) => {
        setOpen(!open)

        setTop(event.clientY)
        setLeft(event.clientX)}
    

    return (

        <Stack>
            <Button onClick={onMenuClick}>Add Props.</Button>
            <Menu open={open} onClick={onMenuClick}
            anchorReference="anchorPosition"
            anchorPosition={{ top: top, left: left }}>
            <Stack>
                <MenuItem>
                Add Properties 
                </MenuItem>
                {(currentVals?.value.val == null) && 
                <MenuItem>Formula from Mass Ratio</MenuItem>}
            </Stack>
            </Menu>
        </Stack>

    )

}