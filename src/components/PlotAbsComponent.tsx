import '@h5web/lib/styles.css';
import { useContext, useEffect, useState } from 'react';
import { SampleContext } from '../context/SampleProviderContext';
import { DataPlot } from './PlotComponent';
import { Button, MenuItem, Select, Stack } from '@mui/material';


export function AbsorptionPlotComponent() {

    const { getAbsorptionValues, absorptionValues, elements, getElements} = useContext(SampleContext)

    const [xlabel, setXlabel] = useState<string|null>(null)
    const [ylabel, setYlabel] = useState<string|null>(null)

    const [xdata, setXdata] = useState<number[]|null>(null)
    const [ydata, setYdata] = useState<number[]|null>(null)
    

    const refreshData = () => {
        // console.log("getting data")
        getAbsorptionValues("mass")
        getElements()
        // dpo some set data.
        if (absorptionValues != undefined){
        if (absorptionValues.x != null && absorptionValues.y != null){
            setXlabel(absorptionValues.xlabel); setYlabel(absorptionValues.ylabel)
            setXdata(absorptionValues.x.split(",").map((m) => parseFloat(m)))
            setYdata(absorptionValues.y.split(",").map((m) => parseFloat(m)))}
        }

    
    }

    return (
        <Stack>
        <DataPlot data_x={xdata} data_y={ydata}
        label_x={xlabel} label_y={ylabel}/>
        <Stack direction="row">
        <Button variant="outlined" onClick={refreshData}>Replot</Button> 
   
        </Stack>
        </Stack>
    )

    }