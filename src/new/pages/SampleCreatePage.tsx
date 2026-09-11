import { useContext } from "react"
import { SampleDataContext } from "../../context/SampleContext"
import {  List, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import { NameSamplePopUp } from "../components/NameSamplePopup"
import { AddPropsMenu } from "../components/AddPropertiesMenu"


export function SampleCreatePage () {

    const { sampleList } = useContext(SampleDataContext)

    return (
        <Stack spacing={2} 
        sx = {{maxWidth:"100%", marginLeft:"2%", marginRight:"2%"}}>
        <Stack direction="row" sx = {{justifyContent:"space-between",
                alignContent:"center", alignItems:"center"}}>

            <Typography><b>Current Samples Available</b></Typography>
        
        <NameSamplePopUp/>
        </Stack>

        {/* make into collapsable table */}
        <List>
            {sampleList.map(i => {return (
            <ListItem key={`${i.name}-list`}>
                <Stack direction="row">
                <ListItemText primary={i.name} key={`${i.name}-list-p`}/>
                <AddPropsMenu sampleName={i.name}/>
                </Stack>
                {i.values.map(value => {
                    if (value.value.val != null)
                {return (<ListItemText key={`${value.name}-list-s`}
                    primary={value.name}
                    secondary={value.value.val}/> )}
                })
                }
            </ListItem>
            )})}
        </List>
        </Stack>
    )
}