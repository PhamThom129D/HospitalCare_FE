// src/components/common/InputField.js
import React from "react";
import { TextField } from "@mui/material";

const InputField = React.forwardRef(({ label, type = "text", ...rest }, ref) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      type={type}
      margin="normal"
      inputRef={ref}
      {...rest}
    />
  );
});

export default InputField;
