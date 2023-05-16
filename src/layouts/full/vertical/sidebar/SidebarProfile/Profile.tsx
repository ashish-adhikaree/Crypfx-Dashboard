import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "../../../../../store/Store";
import { IconPower } from "@tabler/icons-react";
import { AppState } from "../../../../../store/Store";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";
  const router = useRouter();
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
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={"/images/profile/user-1.jpg"} />

          <Box
            onClick={() => {
              router.push("/profile/1");
            }}
          >
            <Typography variant="h6">Mathew</Typography>
            <Typography variant="caption">Trader</Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                sx={{
                  color: "#3a3a3a",
                }}
                component={Link}
                href="/auth/login"
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
