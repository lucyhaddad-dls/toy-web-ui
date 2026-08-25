import { LineVis, getDomain, type Domain, DataCurve} from '@h5web/lib';
import '@h5web/lib/styles.css';
import ndarray from 'ndarray';
import { useContext, useState } from 'react';
import { SampleContext } from '../context/SampleContext';
import { Button, Stack } from '@mui/material';


    //  <DataCurve
    //         abscissas={xdata.data}
    //         ordinates={ydata.data}
    //         visible={true}/>


export function AbsorptionPlotComponent() {

    const { getAbsorptionValues, absorptionValues} = useContext(SampleContext)

    const [xlabel, setXlabel] = useState<string|null>()
    const [ylabel, setYlabel] = useState<string|null>()
    const [xdata, setXdata] = useState<ndarray.NdArray|null>()
    const [ydata, setYdata] = useState<ndarray.NdArray|null>()

    const [dataReady, setDataReady] = useState<boolean>(false)

    const updateData = () => {

        getAbsorptionValues("mass")
        
        if (absorptionValues.x != null && absorptionValues.y != null){
            setXlabel(absorptionValues.xlabel); setYlabel(absorptionValues.ylabel)
            const tmpX = absorptionValues.x.split(",").map((m) => parseFloat(m))
            const tmpY = absorptionValues.y.split(",").map((m) => parseFloat(m))
            setXdata(ndarray(tmpX)); setYdata(ndarray(tmpY))
            setDataReady(true)
        }
        else {setDataReady(false)}
    }
    
    if (dataReady == false){
    return (
        <Stack>
            <div style={{display: 'flex', height: '30rem'}}>
                <Button variant="outlined" onClick={updateData}/>
            </div>
        </Stack>
    )}
  
    if (dataReady == true){
    return (
        <Stack>
            <div style={{display: 'flex', height: '30rem'}}>
                <Button variant="outlined" onClick={updateData}/>

            </div>
        </Stack>
    )}

}

// make a plot function that takes x, y, xlabel, ylabel as props?