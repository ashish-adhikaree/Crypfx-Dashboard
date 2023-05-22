import React, { useContext, useEffect, useRef, useState } from "react";
import {
  CardContent,
  Grid,
  Typography,
  MenuItem,
  Box,
  Avatar,
  Button,
  Modal,
} from "@mui/material";

// components
import BlankCard from "../src/components/shared/BlankCard";
import CustomTextField from "../src/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "../src/components/forms/theme-elements/CustomFormLabel";

// images
import { Stack } from "@mui/system";
import PageContainer from "../src/components/container/Pagecontainer";
import axios from "axios";
import { errorToast, successToast } from "../customToasts";
import Head from "next/head";
import { AuthContext } from "../context";

const AccountTab = () => {
  const [userDetails, setUserDetails] = useState<any>({});
  const backupUserDetails = useRef<any>();
  const passwordFormRef = useRef<HTMLFormElement>(null);
  const [isAlertOpen, setAlert] = useState(false);
  const [profile, setProfile] = useState<string>();
  const [existingpfp, setExistingPfp] = useState<string>("");
  const { userid } = useContext(AuthContext);

  const [filetoupload, setFiletoUpload] = useState<any>();

  const getUserDetails = async () => {
    const { data } = await axios.get("/api/getUserDetails");
    if (data.status === "success") {
      setUserDetails(data.data);
      backupUserDetails.current = data.data;
    } else if (data.status === "error") {
      errorToast(data.message);
    }
  };
  const getPFP = async () => {
    const { data } = await axios.post("/api/getpfp", {
      userid: userid,
    });
    if (data.status === "success") {
      setFiletoUpload(null);
      setProfile(data.image);
      setExistingPfp(data.filename);
    }
  };

  const uploadPFP = async () => {
    const temp = new FormData();
    if (filetoupload) {
      temp.append("file", filetoupload);
      temp.append("existingpfp", existingpfp);
      const { data } = await axios.post("/api/uploadpfp", temp);
      if (data.status === "success") {
        getPFP();
        successToast(data.message);
      } else if (data.status === "error") {
        errorToast(data.message);
      }
    } else {
      errorToast("Select an image first");
    }
  };

  const removePFP = async () => {
    console.log(existingpfp);
    const { data } = await axios.post("/api/removepfp", {
      existingpfp: existingpfp,
    });
    if (data.status === "success") {
      getPFP();
      successToast(data.message);
    } else if (data.status === "error") {
      errorToast(data.message);
    }
  };

  const updateProfile = async () => {
    const { data } = await axios.put("/api/updateProfile", userDetails);
    if (data.status === "success") {
      successToast(data.message);
    } else if (data.status === "error") {
      errorToast(data.message);
    }
  };

  const changePassword = async () => {
    if (passwordFormRef && passwordFormRef.current) {
      const currentpassword = passwordFormRef.current["text-cpwd"].value;
      const newpassword = passwordFormRef.current["text-npwd"].value;
      const confirmpassword = passwordFormRef.current["text-conpwd"].value;

      if (currentpassword.length < 6 || newpassword.length < 6) {
        errorToast("Password must be atleast 6 characters");
        return;
      }
      if (newpassword !== confirmpassword) {
        errorToast("Two Passwords do not match");
        return;
      }

      const { data } = await axios.put("/api/auth/changePassword", {
        currentpassword: currentpassword,
        newpassword: newpassword,
      });

      if (data.status === "success") {
        successToast(data.message);
      } else if (data.status === "error") {
        errorToast(data.message);
      }
    }
  };

  useEffect(() => {
    getUserDetails();
    getPFP();
  }, []);

  return (
    <PageContainer
      title="Account Settings | Crypfx"
      description="This is account settings page"
    >
      <Head>
        <title>Account Settings | CrypfX</title>
      </Head>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to update your profile Details?
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
              color="primary"
              onClick={() => {
                setAlert(false);
                updateProfile();
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      <Grid container spacing={3} paddingTop={3}>
        {/* Change Profile */}
        <Grid item xs={12} lg={6}>
          <BlankCard sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" mb={1}>
                Change Profile
              </Typography>
              <Typography color="textSecondary" mb={3}>
                Change your profile picture from here
              </Typography>
              <Box
                textAlign="center"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Box>
                  <Avatar
                    src={
                      profile && profile.length !== 0 && !filetoupload
                        ? `data:image/png;base64,${Buffer.from(
                            profile
                          ).toString("base64")}`
                        : filetoupload
                        ? URL.createObjectURL(filetoupload)
                        : "/images/profile/defaultuser.png"
                    }
                    alt={"user1"}
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "0 auto",
                      background: "rgba(58, 58, 58, .15)",
                    }}
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
                      onChange={(e: any) => {
                        if (e.target.files) {
                          setFiletoUpload(e.target.files[0]);
                        }
                      }}
                    >
                      Upload
                      <input hidden name="pfp" accept="image/*" type="file" />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setFiletoUpload("");
                      }}
                    >
                      Reset
                    </Button>
                  </Stack>
                  <Typography variant="subtitle1" color="textSecondary" mb={4}>
                    Allowed JPG, GIF or PNG. Max size of 800K
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Stack
                    sx={{
                      direction: {
                        xs: "column",
                        md: "row",
                      },
                    }}
                    justifyContent="center"
                    spacing={2}
                    my={3}
                  >
                    <Button sx={{ width: "fit-content" }} onClick={uploadPFP}>
                      Change Profile Picture
                    </Button>
                    {profile && profile.length !== 0 && (
                      <Button
                        color="error"
                        sx={{ width: "fit-content" }}
                        onClick={removePFP}
                      >
                        Remove Profile Picture
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </BlankCard>
        </Grid>
        {/*  Change Password */}
        <Grid item xs={12} lg={6}>
          <BlankCard sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" mb={1}>
                Change Password
              </Typography>
              <Typography color="textSecondary" mb={3}>
                To change your password please confirm here
              </Typography>
              <form ref={passwordFormRef}>
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
                <Button
                  onClick={changePassword}
                  variant="contained"
                  sx={{ marginTop: "20px" }}
                >
                  Change Password
                </Button>
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserDetails({
                          ...userDetails,
                          ["firstname"]: e.target.value,
                        });
                      }}
                      id="text-first-name"
                      value={userDetails.firstname ? userDetails.firstname : ""}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserDetails({
                          ...userDetails,
                          ["lastname"]: e.target.value,
                        });
                      }}
                      value={userDetails.lastname ? userDetails.lastname : ""}
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
                      value={userDetails.email ? userDetails.email : ""}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserDetails({
                          ...userDetails,
                          ["phone"]: e.target.value,
                        });
                      }}
                      value={userDetails.phone ? userDetails.phone : ""}
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
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => {
                setAlert(true);
              }}
            >
              Save
            </Button>
            <Button
              size="large"
              variant="text"
              color="error"
              onClick={() => {
                if (backupUserDetails && backupUserDetails.current) {
                  setUserDetails({ ...backupUserDetails.current });
                }
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AccountTab;
