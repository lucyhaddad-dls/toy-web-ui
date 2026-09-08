import { Button, Grid, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MultiSampleContext } from "../context/SampleContext";
import { sampleKeys, type SampleResponseKeys } from "../models/models";
import AddIcon from '@mui/icons-material/Add';
import { TextInput } from "../components/TextInput";
import { SetNameBox } from "../components/SampleNameInput";
import { UnitSelectComponent } from "../components/UnitInput";

export function EditSamplePage() {

    const { focusedSample, addToSampleList, sampleList } = useContext(MultiSampleContext)
    
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const [ menuAnchor, setMenuAnchor ] = useState<null | HTMLElement>(null);

    const [ paramsList, setParamsList ] = useState<SampleResponseKeys[]>([])

    let samplePropsList= sampleKeys.filter(k => k != "formula") as SampleResponseKeys[]
    if (focusedSample.name == "_" || focusedSample == undefined)
        {samplePropsList = ["formula", ...samplePropsList]}

    const toggleMenu = (event:null|React.MouseEvent<HTMLButtonElement>=null) => {
        if (event!=null){
            setMenuAnchor(event.currentTarget)}
        else {setMenuAnchor(null)}

        setMenuOpen(!menuOpen)
    }

    const onSaveSample = (name: string) => {
    const values = focusedSample.values
    addToSampleList(values, name)};

    return (
        <Stack spacing={2} sx = {{maxWidth:"100%", marginLeft:"2%", marginRight:"2%"}}>
            <Typography align="center">Hello !! edit sample here. </Typography>
                <Stack sx={{alignContent:"center", 
                    justifyContent:"center"}}>
              
                    <Typography align="center">
                        <b>{focusedSample.name}</b>
                        </Typography>
                <Typography align="center">
                {focusedSample.values.map((k) => 
                    `${k.name} = ${k.value.val}, `)}
                    </Typography>

                </Stack>
           <Stack>

            <Stack spacing={1} direction="row" sx={{justifyContent:"space-around"}}>
            <Button variant="contained" 
            sx = {{ bgcolor:"#586fbb"}}
            onClick={(event)=>toggleMenu(event)}>
            <Stack direction="row" sx = {{ alignContent:"center",
                justifyContent:"center"
            }}>
                <b>Add new property</b>
            <Stack  sx = {{ alignContent:"center",
                justifyContent:"center"}}><AddIcon/> </Stack>
            </Stack>
            </Button>
        
            <UnitSelectComponent/>
            <Button variant="contained" sx = {{ bgcolor:"#586fbb"}}>
                <b>Calculate Available Properties?</b>
            </Button>
            
        {(samplePropsList.filter(i => i == "formula").length > 0 
            || sampleList.length <= 0)
             && <SetNameBox onName={onSaveSample}/>}
            </Stack>

           <Menu open={menuOpen} onClick={() => toggleMenu()}
            anchorEl={menuAnchor}>
  
            {samplePropsList.map( i => (
                <MenuItem  sx = {{minWidth:"15vw"}}
                key = {i}
                onClick={() => {
                    const tmpFilter = paramsList.filter(val => val == i)
                    if (tmpFilter.length == 0){
                        setParamsList([...paramsList, i])
                    } }
                    }>
                {i}
                </MenuItem>))}
           </Menu>
           </Stack>    

        <Grid key="props-list"
        container spacing={2}>
        {paramsList.map(i => <TextInput name = {i}/>)}
        </Grid>
        </Stack>
    )
}
