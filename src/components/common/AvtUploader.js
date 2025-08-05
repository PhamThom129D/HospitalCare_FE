// src/components/common/AvatarUpload.js
import React from "react";
import { Box, Avatar, Button} from "@mui/material";

function AvatarUpload({ preview, onChange }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
      <Avatar
        src={preview}
        sx={{
          width: 160,
          height: 160,
          mb: 2,
          border: "2px solid rgb(123, 179, 235)",
          boxShadow: 3,
        }}
      />
      
      <Button variant="contained" component="label">
        Chọn ảnh đại diện
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={onChange}
        />
      </Button>

    </Box>
  );
}

export default AvatarUpload;
