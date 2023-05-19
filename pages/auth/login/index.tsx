import { Grid, Box, Typography } from "@mui/material";
import AuthLogin from "../authForms/AuthLogin";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title> Login | Crypfx</title>
      </Head>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh", maxHeight: "100vh", overflow: "hidden" }}
      >
        <Grid
          item
          sx={{ height: "100%", display: { xs: "none", md: "block" } }}
          md={6}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              background:
                "linear-gradient(0deg, rgba(59,70,89,1) 10%, rgba(28,33,43,1) 100%)",
              borderRadius: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontSize: { xs: "24px", sm: "30px", lg: "42px" },
                lineHeight: { lg: "46px" },
              }}
            >
              We provide the capital. <br /> You produce the pips. <br /> That
              simple.
            </Typography>
          </Box>
        </Grid>
        <Grid
          sx={{
            height: "100vh",
            overflowY: "scroll",
            paddingBottom: "50px"
          }}
          item
          xs={12}
          md={6}
          width={"100%"}
          display="flex"
          justifyContent="center"
          alignItems="start"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ width: "100%" }}
            p={4}
          >
            <AuthLogin subtitle={<></>} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
