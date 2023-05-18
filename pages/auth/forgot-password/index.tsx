import { Grid, Box, Typography } from "@mui/material";
import Logo from "../../../src/layouts/full/shared/logo/Logo";
import PageContainer from "../../../src/components/container/Pagecontainer";
import AuthForgotPassword from "../authForms/AuthForgotPassword";
import Head from "next/head";

const ForgotPassword = () => (
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
        flexDirection='column'
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            marginTop: {xs: '40px'},
            marginBottom: { xs: "40px"},
          }}
        >
          <Logo />
        </Box>
        <Box p={4}>
          <Typography textAlign='center' variant="h4" fontWeight="700">
            Forgot your password?
          </Typography>

          <Typography
            color="textSecondary"
            variant="subtitle2"
            fontWeight="400"
            mt={2}
            textAlign='center'
          >
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
          </Typography>
          <AuthForgotPassword />
        </Box>
      </Grid>
    </Grid>
  </>
);

export default ForgotPassword;
