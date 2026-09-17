import { useContext, useId, useState } from "react";
import { SampleContext } from "../context/SampleContext";
import {
    Button,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Link } from "react-router-dom";

export function SampleInfoBox(props: { sampleName: string | null,
                                        showLinks: boolean,
                                        defaultOpen: boolean
}) {
  const [open, setOpen] = useState<boolean>(props.defaultOpen);
  const { getSample, getAvailableData, setFocusedSample } = useContext(SampleContext);
  const rowId = useId();

  const sample = getSample(props.sampleName);
  const nonEmptyVals = sample.values.filter((i) => i.value != null);
  let availableData = [""];
  if (props.sampleName) {
    availableData = getAvailableData(props.sampleName);
  }

  const onButtonClick = () => {
    setFocusedSample(sample)
  }

  return (
    <Stack sx={{ alignItems: "center"}}>
      <Paper>
        <Stack direction="row" sx={{ m: 1, width:"15vw" }}>
          <Typography>
            Sample Name: <b>{props.sampleName}</b>
          </Typography>
          <IconButton
            aria-label={open ? "collapse" : "expand"}
            aria-expanded={open}
            aria-controls={rowId}
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
        </Stack>

        {nonEmptyVals.length > 0 && (
          <List id={rowId} aria-hidden={!open ? true : undefined}>
            <Grid container sx={{ justifyContent: "center" }}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {nonEmptyVals.map((value) => {
                  return (
                    <Grid key={`${value.name}-list-0`}>
                      <ListItemText
                        id={rowId}
                        aria-hidden={!open ? true : undefined}
                        key={`${value.name}-list-s`}
                        primary={value.name}
                        secondary={value.value}
                      />
                    </Grid>
                  );
                })}
                <Grid key={"typography-abs"}>
                  <Typography>
                    <b>Available to calculate:</b>
                  </Typography>
                  {availableData.map((val) => {
                    return (
                      <Typography
                        align="center"
                        id={rowId}
                        aria-hidden={!open ? true : undefined}
                        key={"absorption-list"}
                      >
                        {" "}
                        {val}{" "}
                      </Typography>
                    );
                  })}
                </Grid>
              </Collapse>
            </Grid>
          </List>
        )}

        {nonEmptyVals.length == 0 && (
          <List id={rowId} aria-hidden={!open ? true : undefined}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "150px",
                }}
              >
                <ListItemText
                  id={rowId}
                  aria-hidden={!open ? true : undefined}
                  key={`${props.sampleName}-list-s`}
                  primary={"No values"}
                />
                <Typography>
                  <b>Available to calculate:</b>
                </Typography>
                None
              </Stack>
            </Collapse>
          </List>
        )}

    
    {(props.showLinks) &&
        <Stack direction="row" sx={{justifyContent:"space-around"}}>
            <Button onClick={onButtonClick}>
            <Link to="/samples/build">
                Edit Properties
            </Link>
            </Button>
            <Button disabled={availableData.length===0}
            onClick={onButtonClick}>
                To Plot
                </Button>
        </Stack>
}

      </Paper>
    </Stack>
  );
}
