import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Button, Stack } from "@mui/material";

export function PlotComponent() {
    const { getAllAbsorptionData, absorptionData } = useContext(DataContext);

    // instead of useEffect.
    if (absorptionData == undefined || absorptionData[0].data["x"] == null)
        {
            getAllAbsorptionData(["total"])
        }

    return (
        <Stack>
            <Button vairant="outlined">
                hello
            </Button>
        </Stack>
    )
}