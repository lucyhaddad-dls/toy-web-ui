import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Button, Stack } from "@mui/material";

export function PlotComponent() {
    const { getAllAbsorptionData, absorptionData } = useContext(DataContext);

    const retrieveAbs = () => {
        getAllAbsorptionData(["total"])
        console.log(absorptionData)
    }

    return (
        <Stack>
            <Button vairant="outlined" onClick={() => retrieveAbs()}>
            </Button>
        </Stack>
    )
}