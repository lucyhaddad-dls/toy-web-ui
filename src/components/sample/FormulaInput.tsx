import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";

import { SampleContext } from "../../context/SampleContext";
import { PropertyInputWrapper } from "../inputs/PhysicalPropertyInput";

export function FormulaInputPage() {
  const { focusedSample } = useContext(SampleContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const [textInput, setTextInput] = useState<boolean>(false);
  const [massPcInput, setMassPcInput] = useState<boolean>(false);

  const menuToggle = (event: React.MouseEvent<HTMLElement> | null) => {
    if (event != null) {
      setMenuAnchor(event.currentTarget);
    } else {
      setMenuAnchor(null);
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row">
        <Typography>Formula input:</Typography>

        <Button onClick={menuToggle}>Choose Method</Button>
      </Stack>

      <Menu open={menuOpen} anchorEl={menuAnchor} onClick={menuToggle}>
        <MenuItem
          onClick={() => {
            setTextInput(true);
            setMassPcInput(false);
          }}
        >
          Text Input
        </MenuItem>

        <MenuItem
          onClick={() => {
            setTextInput(false);
            setMassPcInput(true);
          }}
        >
          Build by Mass %
        </MenuItem>
      </Menu>

      {textInput && (
        <PropertyInputWrapper sampleId={focusedSample.name}
        name={"formula"}/>
      )}

      {massPcInput && <Stack>Mass % Page here</Stack>}
    </Stack>
  );
}
