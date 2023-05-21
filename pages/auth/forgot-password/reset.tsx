import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import CustomFormLabel from "../../../src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";
import Logo from "../../../src/layouts/full/shared/logo/Logo";
import axios from "axios";
import { errorToast, successToast } from "../../../customToasts";

const Reset = () => {
  const router = useRouter();
  const token = router.query.token;
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    const { data } = await axios.post("/api/auth/resetPassword", {
      token: token,
      password: password,
    });
    if (data.status === "success") {
      successToast(
        "Password reset successfull. Please login with the new password"
      );
      setTimeout(() => {
        router.push("/auth/login"), 200;
      });
    } else if (data.status === "error") {
      errorToast(data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password | Crypfx</title>
      </Head>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={0}
        sx={{ overflowX: "hidden", height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          sx={{
            minWidth: "min(100% , 500px)",
          }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ marginBottom: "40px" }}>
            <Logo />
          </Box>
          <Typography variant="h3">Reset Password</Typography>
          <Stack mt={4} spacing={2} sx={{ width: "100%" }}>
            <CustomFormLabel htmlFor="reset-password">
              New Password
            </CustomFormLabel>
            <CustomTextField
              id="reset-password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <CustomFormLabel htmlFor="reset-confirmpasswordl">
              Confirm Password
            </CustomFormLabel>
            <CustomTextField
              id="reset-confirmpassword"
              variant="outlined"
              fullWidth
              type="password"
              value={confirmpassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              disabled={
                !password ||
                !confirmpassword ||
                password.length < 6 ||
                confirmpassword.length < 6 ||
                password !== confirmpassword
              }
              onClick={handleReset}
            >
              Reset Password
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Reset;
