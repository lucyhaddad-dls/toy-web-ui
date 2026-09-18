import { useCallback, useContext, type ChangeEvent} from "react";
import type { ExtendedResponseKeys, SampleResponseKeys } from "../../models/models";
import { SampleContext } from "../../context/SampleContext";
import { debounce } from "../../models/queryFunctions";
import { Grid, TextField } from "@mui/material";

function PropertyInput(
    props: {sampleId:string, propName:SampleResponseKeys|ExtendedResponseKeys,
        basePropName:SampleResponseKeys, converter:(value:string) => string;
        inverter:(value:string) => string;
    }
) {

    const {getSample, editFocusedSample} = useContext(SampleContext)

    const sample = getSample(props.sampleId)

    let initValue = ""

    const tmp = sample.values.find(i=>i.name==props.propName)?.value
    if (tmp !=undefined && tmp != null){
        if (props.propName === props.basePropName){
            initValue = tmp as string
        }
        else {
            initValue = props.inverter(tmp as string)
        }
    }

    const handleInputConvert = useCallback(
    debounce(
      (val: ChangeEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
        if (val.target.value != undefined) {
            const tmp = props.converter(val.target.value)
            console.log(`convert ${props.propName}=${val.target.value}
                 to${props.basePropName}=${tmp}`)
          editFocusedSample(props.basePropName, tmp);
        }}, 200,), []);
       
    
  const handleInputBase = useCallback(
    debounce(
      (val: ChangeEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
        if (val.target.value != undefined) {
          editFocusedSample(props.basePropName, val.target.value)
        }}, 200,), [], );

    if (props.basePropName === props.propName){
        return (
         <Grid key={`${props.propName}-text-input`}>
            <TextField
            defaultValue={initValue}
            label={props.propName}
            onChange={handleInputBase}/>
         </Grid>   
        )  
    }

    else {
        return (<Grid key={`${props.propName}-text-input`}>
            <TextField
            defaultValue={initValue}
            label={props.propName}
            onChange={handleInputConvert}/>
         </Grid>   
         )
    }
}

export function PropertyInputWrapper(props:{
    sampleId:string, name:SampleResponseKeys|ExtendedResponseKeys
}) {
    const propName = props.name
    let baseName = props.name
    let conv = (val:string) => {return val}
    let inv = (val:string) => {return val}
    
    if (props.name === "cross sectional area"){
        baseName = "area"
    }
    if (props.name === "radius"){
        baseName = "area"
        conv = (val:string) => {
            const area = Math.PI * Number(val)**2
            return area.toString()}
        inv = (val:string) => {
            const radius = Math.sqrt(Number(val))/Math.PI
            return (radius.toString())}
    }
    if (props.name === "diameter"){
             baseName = "area"
        conv = (val:string) => {
            const area = Math.PI * (Number(val)/2)**2
            return area.toString()}
        inv = (val:string) => {
            const radius = Math.sqrt(Number(val)/2)/Math.PI
            return (radius.toString())}
    }

    return (
            <PropertyInput sampleId={props.sampleId}
            propName={propName} basePropName={baseName as SampleResponseKeys}
            converter={conv} inverter={inv}/>
    )
}