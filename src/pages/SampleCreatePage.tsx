import { useContext } from "react"
import { SampleDataContext } from "../context/SampleContext"
import { Stack, Typography } from "@mui/material"
import { NameSamplePopUp } from "../components/NameSamplePopup"

import { SampleRow } from "../components/CollapseTableRow"


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
   
        <Stack>
            {sampleList.map(i => {
                return (<SampleRow input={i} key={`${i.name}-row`}/>)
            })}
        </Stack>

        </Stack>
    )
}