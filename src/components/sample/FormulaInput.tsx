// option for formula builder or pure input....

import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";

export function FormulaInputPage() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const menuToggle = (event: React.MouseEvent<HTMLElement> | null) => {
    if (event != null) {
      setMenuAnchor(event.currentTarget);
    } else {
      setMenuAnchor(null);
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <Stack>
      <Stack direction="row">
        <Typography>Formula input:</Typography>

        <Button onClick={menuToggle}>Choose Method</Button>
      </Stack>

      <Menu open={menuOpen} anchorEl={menuAnchor} onClick={menuToggle}>
        <MenuItem>Text Input</MenuItem>
        <MenuItem>Build by Mass %</MenuItem>
      </Menu>
    </Stack>
  );
}
