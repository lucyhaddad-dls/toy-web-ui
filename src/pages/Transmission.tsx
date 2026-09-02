import {Box, Button, Grid, Stack } from "@mui/material";
import { ValueField } from "../components/ValueFields";
import type {  SampleResponseKeys, SampleValueResponse } from "../models/models";
import { useContext, useState } from "react";
import { SampleContext } from "../context/DataContext";
import { getSampleData, postSampleData } from "../models/queryFunctions";


export function TransmissionPage () {

    const { values, setValues, getValue } = useContext(SampleContext)

    const [currentValues, setCurrentValues] = 
                        useState<SampleValueResponse[]>(values)

    const onChange = (name:SampleResponseKeys, value:string) => {

        const newData = currentValues.map(itm => {
            if (itm.name == name){

                return {...itm, value: {...itm.value, val:value}}
            }
            else {return itm}
        });
        setCurrentValues(newData);
        return () => {}
    }

    const onPost = () => {
        currentValues.map(k => {
            if (k.value.val != null){
           postSampleData(k.name, k.value.val as string )}})


        getSampleData().then(data => setValues(data))
        console.log(values)

    }


    return (
        <Stack sx={{alignItems:"center"}} >

         <Box sx={{ p:4 }}>
            Sample Measurement Inputs

            <Button variant="contained"
            onClick={()=>{onPost()}}>
                Update
            </Button>
         </Box>

        <Grid container
            rowSpacing={1} 
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            {["formula", "absorber", "edge"].map((k, i) =>
           { return (<Grid key={i.toString()}>
                <ValueField key ={i.toString()}
                            default= {
                                values.filter(v => v.name == k)[0] }
                            onChange={onChange} />
                    </Grid>) } )}

            {["density", "area", "thickness", "mass"].map((k, i) =>
           { return (<Grid key={i.toString()}>
                <ValueField key ={i.toString()}
                            default= {
                                values.filter(v => v.name == k)[0] }
                            onChange={onChange}/>
            </Grid>) } )}

        </Grid>
        </Stack>
    )
}