// src/components/common/ErrorText.js
import React from "react";
import { Typography } from "@mui/material";

function ErrorText({ message }) {
  return (
    <Typography color="error" variant="body2" sx={{ mt: -1, mb: 1 }}>
      {message}
    </Typography>
  );
}

export default ErrorText;
