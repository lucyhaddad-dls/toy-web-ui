import { useState } from "react";
import type { AllValuesResponse } from "../../models/models";
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import ndarray, { type NdArray } from "ndarray";
import { type Domain, getDomain, VisCanvas, DataCurve } from "@h5web/lib";

export function AbsorptionPlot(props:{
    data: AllValuesResponse
}) {

    const elementsList = ["total"].concat(...Object.keys(props.data.elements))
    const [currentElement, setCurrentElement] = useState<string>("total")
    const [elmOpen, setElmOpen] = useState<boolean>(false)
    const [elmXY, setElmXY] = useState<HTMLElement|null>(null) 

    const onElmOpen = (event: React.MouseEvent<HTMLElement>) => {
        setElmOpen(!elmOpen)
        if (elmXY){
            setElmXY(null)
        }
        else {setElmXY(event.currentTarget)}
    }

    const xdata:NdArray<number[]> = ndarray(
        props.data.total.energy.value as number[])
    const xlabel = props.data.total.energy.unit

    const tmpY:NdArray<number[]> = ndarray(
        props.data.total.mass_absorption.value as number[])
    const tmpLabel = props.data.total.mass_absorption.unit

    const ydomain: Domain | undefined = tmpY
    ? getDomain(tmpY)
    : [0, 1];
  const xdomain: Domain | undefined = xdata
    ? getDomain(xdata)
    : [0, 1];


    return (
        <Stack>
            Elements are: {elementsList.map(o => `${o}, `)}
        <Stack>

            <Button
            onClick={onElmOpen}>Element (plot)</Button>
            <Menu open={elmOpen}
            anchorEl={elmXY}
            onClick={onElmOpen}
            role="menuitemradio">
            {elementsList.map(elm => {
                return (
                <MenuItem key={elm}
                selected={currentElement===elm}
                onClick={()=> setCurrentElement(elm)}
                >{elm}</MenuItem>
                )
            })}
            </Menu>
        <VisCanvas
        abscissaConfig={{
          visDomain: xdomain ? xdomain : [0, 1],
          label: xlabel as string,
        }}
        ordinateConfig={{
          visDomain: ydomain ? ydomain : [0, 1],
          label: tmpLabel as string,
        }}
      >
        {tmpY && xdata && (
          <DataCurve
            abscissas={xdata.data}
            color="red"
            ordinates={tmpY.data}
            visible
          />
        )}
      </VisCanvas>
 
        </Stack>
        </Stack>
    )
    
}