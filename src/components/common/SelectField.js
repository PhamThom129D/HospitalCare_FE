// src/components/common/SelectField.js
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ErrorText from "./ErrorText";

function SelectField({ label, name, options, register, error, validation }) {
  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        label={label}
        defaultValue=""
        {...register(name, validation)}
        style={{ width: "250px" }}
      >
        <MenuItem value="" disabled>
          -- Chọn {label.toLowerCase()} --
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      <br />
      {error && <ErrorText message={error.message} />}
    </FormControl>
  );
}


export default SelectField;
