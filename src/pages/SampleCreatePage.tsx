import { useContext } from "react";
import { SampleContext } from "../context/SampleContext";
import { Grid, Stack, Typography } from "@mui/material";
import { SaveSamplePopUp } from "../components/inputs/NameSamplePopup";
import { SampleInfoBox } from "../components/SampleInfoComponent";

export function SampleCreatePage() {
  const { sampleList } = useContext(SampleContext);

  return (
    <Stack
      spacing={2}
      sx={{ maxWidth: "100%", marginLeft: "2%", marginRight: "2%" }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          <b>Current Samples Available</b>
        </Typography>

        <SaveSamplePopUp saveValues={null} />
      </Stack>


      <Grid container spacing={1}>
        {sampleList.map(i => {
          return <SampleInfoBox sampleName={i.name} showLinks={true}
          defaultOpen={true} key={i.name}/>
        })}
      </Grid>
    </Stack>
  );
}
