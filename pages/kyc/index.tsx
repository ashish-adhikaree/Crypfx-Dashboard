import { Alert, Box, Button, Typography } from "@mui/material";
import { IconFileText } from "@tabler/icons-react";
import axios from "axios";
import Head from "next/head";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context";
import { errorToast, successToast } from "../../customToasts";
import Link from "next/link";
import Image from "next/image";

const KYC = () => {
  const { userid } = useContext(AuthContext);
  const [kyc, setKyc] = useState<any>([]);
  const [filetoupload, setfiletoupload] = useState<any>();
  const getKYC = async () => {
    const { data } = await axios.post("/api/getKYC", {
      userid: userid,
    });
    if (data.status === "success") {
      setKyc(data.data);
    }
  };

  function bufferToBase64(buffer: any) {
    return Buffer.from(buffer).toString("base64");
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setfiletoupload(e.target.files[0]);
    }
  };
  const uploadFile = async () => {
    const kycdata = new FormData();
    if (filetoupload) {
      kycdata.append("file", filetoupload);
      kycdata.append("kyclink", kyc.kyclink ? kyc.kyclink : "");
    }
    try {
      const { data } = await axios.post("/api/submitKYC", kycdata, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (data.status === "success") {
        successToast(data.message);
      } else if (data.status === "error") {
        errorToast(data.message);
      }
    } catch {
      errorToast("Something Went Wrong");
    }
  };

  useEffect(() => {
    getKYC();
  }, []);

  return (
    <>
      <Head>
        <title>KYC | Crypfx</title>
      </Head>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography variant="h4">KYC</Typography>
        <Alert
          sx={{
            width: "fit-content",
            padding: "2",
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
          <Box>
            <Typography variant="h5">Submitted doc</Typography>
            <Image
              height={200}
              width={200}
              alt="kyc"
              src={`data:image/png;base64,${bufferToBase64(kyc.file)}`}
            />
          </Box>
        ) : filetoupload ? (
          <>
            <Box>
              <Typography variant="h5" sx={{ marginBlock: "10px" }}>
                Selected doc
              </Typography>
              <Image
                height={200}
                width={200}
                alt="kyc"
                src={URL.createObjectURL(filetoupload)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <Button color="primary" onClick={uploadFile}>
                Upload KYC
              </Button>
              <Button
                color="error"
                onClick={() => {
                  setfiletoupload("");
                }}
              >
                Remove Selected
              </Button>
            </Box>
          </>
        ) : (
          <>
            <form>
              <Box
                sx={{
                  height: "200px",
                  width: "min(100%,300px)",
                  border: "1px solid #aeaeae",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  textAlign: "center",
                  position: "relative",
                  fontWeight: "700",
                }}
              >
                <IconFileText height={80} width={80} strokeWidth={1} />
                Click here or Drag and Drop your ID/Passport here. Only jpg/jpeg
                is accepted
                <input
                  style={{
                    opacity: "0",
                    position: "absolute",
                    inset: "0",
                    cursor: "pointer",
                  }}
                  onChange={handleChange}
                  accept="[image/jpg, image/jpeg]"
                  type="file"
                />
                {/* <Button
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.click();
                  }
                }}
                color="primary"
                type="submit"
                sx={{ marginTop: "20px" }}
              >
                Upload KYC
                <input
                  ref={inputRef}
                  hidden
                  onChange={uploadFile}
                  accept="[image/jpg, image/jpeg,application/pdf]"
                  type="file"
                />
              </Button> */}
              </Box>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default KYC;
