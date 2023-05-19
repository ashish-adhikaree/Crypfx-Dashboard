import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import ParentCard from "../src/components/shared/ParentCard";
import { Box, Button, Modal, Typography } from "@mui/material";
import CustomTextField from "../src/components/forms/theme-elements/CustomTextField";
import axios from "axios";
import { AuthContext } from "../context";
import { useRouter } from "next/router";
import { errorToast, successToast } from "../customToasts";

const Setup = () => {
  const { type } = useContext(AuthContext);
  const router = useRouter();
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [isAlertOpen, setAlert] = useState(false);

  const getWelcomeMessage = async () => {
    const { data } = await axios.get("/api/getWelcomeMessage");
    if (data.status === "success") {
      setWelcomeMessage(data.welcomemsg);
    } else if (data.status === "error") {
      console.log(data.message);
    }
  };

  const updateWelcomeMessage = async () => {
    const { data } = await axios.post("/api/updateWelcomeMessage", {
      welcomemessage: welcomeMessage,
    });

    if (data.status === "success") {
      successToast(data.message);
    } else if (data.status === "error") {
      errorToast(data.message);
    }
  };

  useEffect(() => {
    if (type === "Customer") {
      router.push("/");
    } else {
      getWelcomeMessage();
    }
  }, []);

  if (type === "Customer") {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Setup | Crypfx</title>
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Are you sure you want to update the welcome message?
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
                updateWelcomeMessage();
                setAlert(false);
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box marginTop={3}>
        <ParentCard
          title="Change welcome message text"
          footer={
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setAlert(true);
              }}
            >
              Update
            </Button>
          }
        >
          <CustomTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setWelcomeMessage(e.target.value);
            }}
            placeholder="Type in custom welcome message (Clear the input and submit it to show welcome message)"
            value={welcomeMessage}
            id="welcome-text"
            variant="outlined"
            fullWidth
            multiline
          />
        </ParentCard>
      </Box>
    </>
  );
};

export default Setup;
