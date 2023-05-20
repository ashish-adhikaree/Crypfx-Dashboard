import { Alert, Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { errorToast, successToast } from "../../customToasts";
import { AuthContext } from "../../context";
// import Image from "next/image";

const IndividualKYC = () => {
  const router = useRouter();
  const userid = router.query.userid;
  const name = router.query.name;
  const { type } = useContext(AuthContext);
  const [isAlertOpen, setAlert] = useState(false);
  const [actionBtnClicked, setactionBtnClicked] = useState<string>();
  const [kyc, setKyc] = useState<any>([]);

  const getKYC = async () => {
    const { data } = await axios.post("/api/getKYC", {
      userid: userid,
    });
    if (data.status === "success") {
      setKyc(data.data);
    }
  };

  const changeStatus = async (status: string) => {
    const { data } = await axios.post("/api/updateKYCStatus", {
      userid: userid,
      status: status,
      kyclink: status === "Rejected" ? "" : kyc.kyclink,
    });
    if (data.status === "success") {
      successToast(data.message);
      router.reload();
      router.reload();
    } else if (data.status === "error") {
      errorToast(data.message);
    }
  };

  function bufferToBase64(buffer: any) {
    return Buffer.from(buffer).toString("base64");
  }

  useEffect(() => {
    getKYC();
  }, []);

  return (
    <>
      <Head>
        <title>KYC | Crypfx</title>
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
          {actionBtnClicked === "Accept" && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to accept the KYC?
              </Typography>
              <Box sx={{ marginTop: "30px" }}>
                <Button
                  variant="outlined"
                  color="warning"
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
                    changeStatus("Accepted");
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </>
          )}
          {actionBtnClicked === "Reject" && (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="error"
              >
                Are you sure you want to reject the KYC?
              </Typography>
              <Box sx={{ marginTop: "30px" }}>
                <Button
                  variant="outlined"
                  color="warning"
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
                    setAlert(false);
                    changeStatus("Rejected");
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography sx={{ textTransform: "capitalize" }} variant="h4">
            {name}'s KYC
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setAlert(true);
                setactionBtnClicked("Reject");
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setAlert(true);
                setactionBtnClicked("Accept");
              }}
            >
              Accept
            </Button>
          </Box>
        </Box>
        <Alert
          sx={{
            width: "fit-content",
            padding: "2",
            marginTop: "20px",
          }}
          severity={
            kyc.kycstatus === "Not Submitted"
              ? "info"
              : kyc.kycstatus === "Pending Review"
              ? "warning"
              : kyc.kycstatus === "Accepted"
              ? "success"
              : "error"
          }
        >
          Status: {kyc.kycstatus}
        </Alert>
        {kyc.kyclink ? (
          <Box marginTop={5}>
            <Box>
              <Typography variant="h5">Submitted doc</Typography>
              <img
                height={200}
                width={200}
                alt="hello"
                src={`data:image/png;base64,${bufferToBase64(kyc.file)}`}
              />
              <Button
                sx={{ display: "block" }}
                color="primary"
                onClick={() => {
                  if (window) {
                    var image = new Image();
                    image.src =
                      "data:image/jpg;base64," + bufferToBase64(kyc.file);

                    var w = window.open("");
                    if (w) {
                      w.document.write(image.outerHTML);
                    }
                  }
                }}
              >
                Open full screen
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="h6" sx={{ marginTop: "20px" }}>
            {" "}
            Documents not submitted yet
          </Typography>
        )}
      </Box>
    </>
  );
};

export default IndividualKYC;
