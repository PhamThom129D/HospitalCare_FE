import { Home as HomeIcon } from "@mui/icons-material";
import React from "react";
import { Box, Typography } from "@mui/material";    
import FormWrapper from "../components/common/FormWrapper";

function Home() {
  return (
    <FormWrapper title="Trang chủ">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Chào mừng đến với Trang chủ
        </Typography>
        <Typography variant="body1">
          Đây là nơi bạn có thể tìm thấy thông tin và các chức năng chính của hệ thống.
        </Typography>
      </Box>
    </FormWrapper>
  );
}
export default Home;