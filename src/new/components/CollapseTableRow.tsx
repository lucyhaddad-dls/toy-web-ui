// collapsable table items for displaying sample properties:

import { useId, useState } from "react";
import type { SampleResponse } from "../../models/models";
import { Collapse, IconButton, List, ListItemText, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { AddPropsMenu } from "./AddPropertiesMenu";

export function SampleRow(props: { input: SampleResponse }) {

    const [open, setOpen] = useState<boolean>(false)
    const rowId = useId()

    const nonNullValues = props.input.values.filter(i => i.value.val!= null)

    return (
        <Stack>
        <Stack direction="row">
        <Typography>{props.input.name}</Typography>
        <IconButton 
            aria-label={open? "collapse": "expand"}
            aria-expanded={open}
            aria-controls={rowId}
            size="small"
            onClick={() => setOpen(!open)}>
                {open? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
            </IconButton>
            <AddPropsMenu sampleName={props.input.name}/>
            </Stack>
        {
        (nonNullValues.length > 0) && 
      
        <List id={rowId} aria-hidden={!open?true : undefined}>
            {
            nonNullValues.map(value => {
            return (<Collapse in={open} timeout="auto" unmountOnExit>
                    <ListItemText  id={rowId}
                     aria-hidden={!open?true : undefined}
                    key={`${value.name}-list-s`} 
                    primary={value.name} secondary={value.value.val}/>
                     </Collapse>
            )}
            )}

        </List> }

        {
        (nonNullValues.length == 0) && 
        <List id={rowId} aria-hidden={!open?true : undefined}>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <ListItemText id={rowId}
            aria-hidden={!open?true : undefined}
                key={`${props.input.name}-list-s`}
                primary={"No values"}/>
            </Collapse>
        </List> }

        </Stack>
    )
}