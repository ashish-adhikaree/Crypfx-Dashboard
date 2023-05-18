import React, { useState, useContext } from "react";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import * as dropdownData from "./data";

import { IconMail } from "@tabler/icons-react";
import { Stack } from "@mui/system";
import { AuthContext } from "../../../../../context";
import DefaultUserImage from "../../../../../public/images/profile/defaultuser.png";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { image, fullname } = useContext(AuthContext);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        {image ? (
          <Avatar alt={fullname} src={image} />
        ) : (
          <Avatar
            sx={{
              height: "35px",
              width: "35px",
              backgroundColor: "rgba(58, 58, 58, .15)",
            }}
            alt={fullname}
            src={DefaultUserImage.src}
          />
        )}
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
    </Box>
  );
};

export default Profile;
