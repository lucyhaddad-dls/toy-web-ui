import { useContext, useState } from "react";
import { SampleContext } from "../../context/SampleContext";
import { Button, Grid, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { SampleTypes } from "../../models/defaults";
import AddIcon from "@mui/icons-material/Add";
import type {
  ExtendedResponseKeys,
  SampleResponseKeys,
} from "../../models/models";
import { PropertyInputWrapper } from "../inputs/PhysicalPropertyInput";

export function InputPagePellet() {
  const { focusedSample } = useContext(SampleContext);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<HTMLElement | null>(null);

  const menuToggle = (event: React.MouseEvent<HTMLElement> | null) => {
    if (event != null) {
      setMenuPosition(event.currentTarget);
    } else {
      setMenuPosition(null);
    }
    setMenuOpen(!menuOpen);
  };

  const nonEmptyVals = focusedSample.values.filter((i) => {
    i.value != null && SampleTypes.pellet.includes(i.name);
  });

  const [toAdd, setToAdd] = useState<string[]>([]);
  const onAddProperty = (name: string) => {
    if (!toAdd.includes(name)) {
      setToAdd([...toAdd, name]);
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
        <Typography align="center">Physical Property Input</Typography>
        <Button variant="contained" onClick={menuToggle}>
          <Typography align="center">Add A Property</Typography>
          <AddIcon />
        </Button>

        <Menu open={menuOpen} onClick={menuToggle} anchorEl={menuPosition}>
          {SampleTypes.pellet.map((val) => (
            <MenuItem
              onClick={() => {
                onAddProperty(val);
              }}
              key={val}
            >
              {val}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
      <Grid container spacing={2}>
        {nonEmptyVals.map((i) => {
          if (i.value != "") {
            return (
              <Grid key={i.name}>
                <PropertyInputWrapper
                  sampleId={focusedSample.name}
                  name={i.name}
                />
              </Grid>
            );
          }
        })}
      </Grid>
      <Grid>
        {toAdd.map((i) => {
          if (SampleTypes.pellet.includes(i)) {
            return (
              <Grid key={i}>
                <PropertyInputWrapper
                  sampleId={focusedSample.name}
                  name={i as ExtendedResponseKeys}
                />
              </Grid>
            );
          } else {
            return (
              <Grid key={i}>
                <PropertyInputWrapper
                  sampleId={focusedSample.name}
                  name={i as SampleResponseKeys}
                />
              </Grid>
            );
          }
        })}
      </Grid>
    </Stack>
  );
}
