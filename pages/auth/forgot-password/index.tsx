import { Grid, Box, Typography } from "@mui/material";
import Logo from "../../../src/layouts/full/shared/logo/Logo";
import PageContainer from "../../../src/components/container/Pagecontainer";
import AuthForgotPassword from "../authForms/AuthForgotPassword";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { errorToast, successToast } from "../../../customToasts";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgot = async () => {
    const { data } = await axios.post("/api/auth/forgotPassword", {
      email: email,
    });
    if (data.status === "success") {
      setEmail("")
      successToast("Password reset link sent to your email.");
    } else if (data.status === "error") {
      errorToast(data.message);
    }
  };
  return (
    <>
      <Head>
        <title>Forget Password | Crypfx</title>
      </Head>
      <Grid
        container
        justifyContent="center"
        spacing={0}
        sx={{ overflowX: "hidden" }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              marginTop: { xs: "40px" },
              marginBottom: { xs: "40px" },
            }}
          >
            <Logo />
          </Box>
          <Box p={4}>
            <Typography textAlign="center" variant="h4" fontWeight="700">
              Forgot your password?
            </Typography>

            <Typography
              color="textSecondary"
              variant="subtitle2"
              fontWeight="400"
              mt={2}
              textAlign="center"
            >
              Please enter the email address associated with your account and We
              will email you a link to reset your password.
            </Typography>
            <AuthForgotPassword
              email={email}
              setEmail={setEmail}
              handleForgot={handleForgot}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgotPassword;
