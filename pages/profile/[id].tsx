import React from "react";
import {
  CardContent,
  Grid,
  Typography,
  MenuItem,
  Box,
  Avatar,
  Button,
} from "@mui/material";

// components
import BlankCard from "../../src/components/shared/BlankCard";
import CustomTextField from "../../src/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "../../src/components/forms/theme-elements/CustomSelect";

// images
import { Stack } from "@mui/system";
import PageContainer from "../../src/components/container/Pagecontainer";

// locations
const locations = [
  {
    value: "us",
    label: "United States",
  },
  {
    value: "uk",
    label: "United Kingdom",
  },
  {
    value: "india",
    label: "India",
  },
  {
    value: "russia",
    label: "Russia",
  },
];

// currency
const currencies = [
  {
    value: "us",
    label: "US Dollar ($)",
  },
  {
    value: "uk",
    label: "United Kingdom (Pound)",
  },
  {
    value: "india",
    label: "India (INR)",
  },
  {
    value: "russia",
    label: "Russia (Ruble)",
  },
];

const AccountTab = () => {
  const [location, setLocation] = React.useState("india");

  const handleChange1 = (event: any) => {
    setLocation(event.target.value);
  };

  //   currency
  const [currency, setCurrency] = React.useState("india");

  const handleChange2 = (event: any) => {
    setCurrency(event.target.value);
  };

  return (
    <PageContainer
      title="Accunt Settings | CrypFX"
      description="This is account settings page"
    >
      <Grid container spacing={3} paddingTop={3}>
        {/* Change Profile */}
        <Grid item xs={12} lg={6}>
          <BlankCard>
            <CardContent>
              <Typography variant="h5" mb={1}>
                Change Profile
              </Typography>
              <Typography color="textSecondary" mb={3}>
                Change your profile picture from here
              </Typography>
              <Box textAlign="center" display="flex" justifyContent="center">
                <Box>
                  <Avatar
                    src={"/images/profile/user-1.jpg"}
                    alt={"user1"}
                    sx={{ width: 120, height: 120, margin: "0 auto" }}
                  />
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                    my={3}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      component="label"
                    >
                      Upload
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <Button variant="outlined" color="error">
                      Reset
                    </Button>
                  </Stack>
                  <Typography variant="subtitle1" color="textSecondary" mb={4}>
                    Allowed JPG, GIF or PNG. Max size of 800K
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </BlankCard>
        </Grid>
        {/*  Change Password */}
        <Grid item xs={12} lg={6}>
          <BlankCard>
            <CardContent>
              <Typography variant="h5" mb={1}>
                Change Password
              </Typography>
              <Typography color="textSecondary" mb={3}>
                To change your password please confirm here
              </Typography>
              <form>
                <CustomFormLabel
                  sx={{
                    mt: 0,
                  }}
                  htmlFor="text-cpwd"
                >
                  Current Password
                </CustomFormLabel>
                <CustomTextField
                  id="text-cpwd"
                  variant="outlined"
                  fullWidth
                  type="password"
                />
                {/* 2 */}
                <CustomFormLabel htmlFor="text-npwd">
                  New Password
                </CustomFormLabel>
                <CustomTextField
                  id="text-npwd"
                  variant="outlined"
                  fullWidth
                  type="password"
                />
                {/* 3 */}
                <CustomFormLabel htmlFor="text-conpwd">
                  Confirm Password
                </CustomFormLabel>
                <CustomTextField
                  id="text-conpwd"
                  variant="outlined"
                  fullWidth
                  type="password"
                />
              </form>
            </CardContent>
          </BlankCard>
        </Grid>
        {/* Edit Details */}
        <Grid item xs={12}>
          <BlankCard>
            <CardContent>
              <Typography variant="h5" mb={1}>
                Personal Details
              </Typography>
              <Typography color="textSecondary" mb={3}>
                To change your personal detail , edit and save from here
              </Typography>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="text-first-name"
                    >
                     First Name
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-first-name"
                      value="Mathew"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* 2 */}
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="text-last-name"
                    >
                      Last Name
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-last-name"
                      value="Anderson"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* 3 */}
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="text-location"
                    >
                     Username
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-username"
                      value="username"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* 5 */}
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="text-email"
                    >
                      Email
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-email"
                      value="info@modernize.com"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* 6 */}
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="text-phone"
                    >
                      Phone
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-phone"
                      value="+91 12345 65478"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                 </Grid>
              </form>
            </CardContent>
          </BlankCard>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "end" }}
            mt={3}
          >
            <Button size="large" variant="contained" color="primary">
              Save
            </Button>
            <Button size="large" variant="text" color="error">
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AccountTab;
