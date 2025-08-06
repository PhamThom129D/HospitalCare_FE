// src/components/common/FormWrapper.js
import React from "react";
import { Paper, Box, Typography, Container } from "@mui/material";

function FormWrapper({ title, children, size = "sm" }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f5f5f5", px: 2 }}
    >
      <Container maxWidth={size}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            width: "100%",
          }}
        >
          <Typography variant="h5" textAlign="center" gutterBottom>
            {title}
          </Typography>
          {children}
        </Paper>
      </Container>
    </Box>
  );
}

export default FormWrapper;
