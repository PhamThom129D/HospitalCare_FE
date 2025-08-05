// src/components/common/SelectField.js
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ErrorText from "./ErrorText";

function SelectField({ label, name, options, register, error }) {
  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        label={label}
        defaultValue=""
        {...register(name)}
        style={{ width: "250px" }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {error && <ErrorText message={error.message} />}
    </FormControl>
  );
}

export default SelectField;
