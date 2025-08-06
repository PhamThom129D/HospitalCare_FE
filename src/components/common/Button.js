// src/components/common/Button.js
import React from "react";
import { Button as MuiButton } from "@mui/material";

function Button({ children, ...props }) {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 2, py: 1.5 }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
