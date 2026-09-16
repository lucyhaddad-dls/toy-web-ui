import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function LinksList() {
  return (
    <Stack
      sx={{
        bgcolor: "primary.dark",
        minHeight: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: "80%",
      }}
      direction="row"
      spacing={2}
    >
      <Link to="/">
        <Typography sx={{ bgcolor: "primary.dark", color: "white" }}>
          <b>Home (Placeholder page)</b>
        </Typography>
      </Link>

      <Link to="/samples">
        <Typography sx={{ bgcolor: "primary.dark", color: "white" }}>
          <b>Sample Information</b>
        </Typography>
      </Link>

      <Link to="/samples/mass-percentage">
        <Typography sx={{ bgcolor: "primary.dark", color: "white" }}>
          <b>Formula from Mass %</b>
        </Typography>
      </Link>

      <Link to="/samples/plot">
        <Typography sx={{ bgcolor: "primary.dark", color: "white" }}>
          <b>Absorption Plots</b>
        </Typography>
      </Link>
    </Stack>
  );
}
