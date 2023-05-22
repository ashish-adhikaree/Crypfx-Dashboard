import { useState, useContext } from "react";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  Modal,
  Tooltip,
} from "@mui/material";

import { IconUser } from "@tabler/icons-react";
import { AuthContext } from "../../../../../context";
import DefaultUserImage from "../../../../../public/images/profile/defaultuser.png";
import { useRouter } from "next/router";
import axios from "axios";
import { errorToast, successToast } from "../../../../../customToasts";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { image, fullname, type, email } = useContext(AuthContext);
  const [isAlertOpen, setAlert] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout");
      if (data.status == "success") {
        successToast(data.message);
        router.push("/auth/login");
      } else if (data.status == "error") {
        errorToast(data.message);
      }
    } catch {
      errorToast("Something went wrong. Please refresh the page");
    }
  };

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
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 2,
          },
        }}
      >
        <Box
          display={"flex"}
          alignItems="center"
          gap={2}
          sx={{
            m: 0,
            p: 2,
            color: "#3a3a3a",
          }}
        >
          <Modal
            open={isAlertOpen}
            onClose={() => {
              setAlert(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ background: "#ffffff", padding: "30px" }}>
              <Typography
                color="#3a3a3a"
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Are you sure you want to logout?
              </Typography>
              <Box sx={{ marginTop: "30px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    mr: 1,
                  }}
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "#3a3a3a",
                    "&:hover": {
                      background: "#4b5563",
                    },
                  }}
                  onClick={() => {
                    handleLogout();
                    setAlert(false);
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </Modal>

          {image ? (
            <Avatar alt={fullname} src={image} />
          ) : (
            <Avatar
              sx={{
                height: "30px",
                width: "30px",
                backgroundColor: "rgba(58, 58, 58, .15)",
              }}
              alt={fullname}
              src={DefaultUserImage.src}
            />
          )}
          <Box>
            <Typography variant="h6" style={{ textTransform: "capitalize" }}>
              {fullname}
            </Typography>
            <Typography variant="caption">{email}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            ml: "auto",
          }}
        >
          <Link
            title="Profile"
            href="/profile"
            style={{
              color: "#3a3a3a",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: 16,
            }}
          >
            <IconUser />
            <Box>
              <Typography fontWeight={800}>Profile</Typography>
              <Typography>Account settings and more</Typography>
            </Box>
          </Link>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <Tooltip title="Logout" placement="bottom">
            <Button
              sx={{
                background: "#3a3a3a",
                "&:hover": {
                  background: "#4b5563",
                },
                color: "#ffffff",
                width: "100%",
                paddingBlock: "10px",
                marginTop: "10px",
              }}
              onClick={() => {
                setAlert(true);
              }}
              aria-label="logout"
            >
              <Typography className="logout">Logout</Typography>
            </Button>
          </Tooltip>
        </Box>
      </Menu>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
    </Box>
  );
};

export default Profile;
