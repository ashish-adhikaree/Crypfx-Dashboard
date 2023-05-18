import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
  Button,
  Modal,
} from "@mui/material";
import { useSelector } from "../../../../../store/Store";
import { IconPower } from "@tabler/icons-react";
import { AppState } from "../../../../../store/Store";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import axios from "axios";
import { errorToast, successToast } from "../../../../../../customToasts";
import { useState, useContext } from "react";
import { AuthContext } from "../../../../../../context";
import DefaultUserImage from "../../../../../../public/images/profile/defaultuser.png";

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";
  const router = useRouter();
  const [isAlertOpen, setAlert] = useState(false);
  const { image, fullname, type } = useContext(AuthContext);

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

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{
        m: 3,
        p: 2,
        bgcolor: `rgba(58, 58, 58, .15)`,
        color: "#3a3a3a",
        cursor: "pointer",
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
            color="error"
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
              color="error"
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
      {!hideMenu ? (
        <>
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
          <Box
            onClick={() => {
              router.push("/profile");
            }}
          >
            <Typography variant="h6" style={{ textTransform: "capitalize" }}>
              {fullname.split(" ")[0]}
            </Typography>
            <Typography variant="caption">
              {type === "Customer" ? "Trader" : "Admin"}
            </Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                sx={{
                  color: "#3a3a3a",
                }}
                onClick={() => {
                  setAlert(true);
                }}
                aria-label="logout"
                size="small"
              >
                <LogoutRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
