import { useContext, useState } from "react";
import { SampleContext } from "../context/SampleContext";
import { type AbsorptionType } from "../models/models";
import { Stack } from "@mui/material";
import { getAbsorptionData } from "../models/queryFunctions";

export function PlotComponent () {

    const { absorption, setAbsorption } = useContext(SampleContext)

    const [currentValue, setCurrentValue] = useState<AbsorptionType>("mass")

    const [elementList, setElementList] = useState<string>("total")


    return (
        <Stack>hello from plot component</Stack>
    )
}   