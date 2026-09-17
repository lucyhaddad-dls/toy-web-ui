// add properties by input or formula via ratios/%'s:

import { useContext } from "react";
import { SampleContext } from "../../context/SampleContext";
import { Button, Stack } from "@mui/material";

import { Link } from "react-router-dom";

export function AddPropsMenu(props: { sampleName: string }) {

  const { setFocusedSample, getSample } = useContext(SampleContext)

  const onLinkClick = () => {
    const currentSample = getSample(props.sampleName)
    setFocusedSample(currentSample)
  }
 
  return (
    <Stack>
      <Button variant="outlined" onClick={onLinkClick}>
        <Link to="/samples/build">
        Edit Properties
        </Link>
      </Button>
      
    </Stack>
  );
}
