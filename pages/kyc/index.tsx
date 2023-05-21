import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Typography,
} from "@mui/material";
import { IconFileText } from "@tabler/icons-react";
import axios from "axios";
import Head from "next/head";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context";
import { errorToast, successToast } from "../../customToasts";
import Link from "next/link";
import Image from "next/image";
import CustomFormLabel from "../../src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "../../src/components/forms/theme-elements/CustomSelect";
import CustomTextField from "../../src/components/forms/theme-elements/CustomTextField";
import CustomCheckbox from "../../src/components/forms/theme-elements/CustomCheckbox";
import { IconCloudUpload } from "@tabler/icons-react";
import { useRouter } from "next/router";

const KYC = () => {
  const { userid } = useContext(AuthContext);
  const [kyc, setKyc] = useState<any>([]);
  const router = useRouter();
  const [filetoupload, setfiletoupload] = useState<any>();
  const [country, setCountry] = useState<string>("");
  const [doctype, setDoctype] = useState<string>("id");
  const [agreePolicy, setAgreepolicy] = useState<boolean>(false);
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
      kycdata.append("doctype", doctype);
      kycdata.append("country", country);
    }
    try {
      const { data } = await axios.post("/api/submitKYC", kycdata, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (data.status === "success") {
        router.reload();
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
        <Typography variant="h4">Upload a proof of your identity</Typography>
        <Typography>A valid government issued ID (Passport, ID)</Typography>
        <Alert
          sx={{
            width: "fit-content",
            padding: "2",
          }}
          severity={
            kyc.kycstatus === "Not Submitted"
              ? "info"
              : kyc.kycstatus === "Pending"
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
            <Box sx={{ marginBlock: "20px" }}>
              <Typography variant="h6">Country</Typography>
              <Typography>{kyc.country}</Typography>
            </Box>
            <Box sx={{ marginBlock: "20px" }}>
              <Typography variant="h6">Document type</Typography>
              <Typography sx={{textTransform:"capitalize"}}>{kyc.kycdoctype}</Typography>
            </Box>
            <Typography variant="h6" sx={{marginBottom:"20px"}}>Submitted Document</Typography>

            <Image
              height={200}
              width={200}
              alt="kyc"
              src={`data:image/png;base64,${bufferToBase64(kyc.file)}`}
            />
          </Box>
        ) : (
          <>
            <form>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  maxWidth: "550px",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <Box sx={{ flex: "1", minWidth: "min(100%,200px)" }}>
                  <CustomFormLabel
                    sx={{
                      mt: "20px",
                    }}
                    htmlFor="country"
                  >
                    Your Country
                  </CustomFormLabel>
                  <CustomTextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCountry(e.target.value);
                    }}
                    value={country}
                    id="country"
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: "1", minWidth: "min(100%,200px)" }}>
                  <CustomFormLabel
                    sx={{
                      mt: "20px",
                    }}
                    htmlFor="doctype"
                  >
                    Document Type
                  </CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="doctype"
                    variant="outlined"
                    value={doctype}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setDoctype(e.target.value);
                    }}
                  >
                    <MenuItem key="id" value="id">
                      ID
                    </MenuItem>
                    <MenuItem key="passport" value="passport">
                      Passport
                    </MenuItem>
                  </CustomSelect>
                </Box>
              </Box>
              {filetoupload ? (
                <>
                  <Box>
                    <Typography variant="h5" sx={{ marginBlock: "10px" }}>
                      Selected doc
                    </Typography>
                    <Image
                      height={200}
                      width={200}
                      style={{ objectFit: "contain" }}
                      alt="kyc"
                      src={URL.createObjectURL(filetoupload)}
                    />
                  </Box>
                </>
              ) : (
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
                    fontWeight: "700",
                  }}
                >
                  <IconCloudUpload height={40} width={40} strokeWidth={1} />
                  <Typography variant="h6">Upload Your Document</Typography>
                  <Typography>Support: JPG/ JPEG/ PNG</Typography>
                  <Box
                    sx={{
                      position: "relative",
                      height: "40px",
                      width: "130px",
                      marginTop: "30px",
                      background: "#3A3A3A",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    Choose File
                    <input
                      style={{
                        opacity: "0",
                        position: "absolute",
                        inset: "0",
                        cursor: "pointer",
                      }}
                      onChange={handleChange}
                      accept="[image/jpg, image/jpeg, image/png]"
                      type="file"
                    />
                  </Box>
                </Box>
              )}
              <FormGroup sx={{ marginBlock: "20px" }}>
                <FormControlLabel
                  control={<CustomCheckbox />}
                  label="I confirm that I uploaded a valid government-issued photo ID. This ID includes my picture, signature, name, date of birth"
                  name="agreetopolicy"
                  onChange={() => {
                    setAgreepolicy(true);
                  }}
                />
              </FormGroup>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <Button
                  color="primary"
                  onClick={uploadFile}
                  disabled={
                    country.length === 0 || doctype.length === 0 || !agreePolicy
                  }
                >
                  Upload KYC
                </Button>
                <Button
                  color="error"
                  onClick={() => {
                    setfiletoupload("");
                  }}
                  disabled={!filetoupload}
                >
                  Remove Selected
                </Button>
              </Box>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default KYC;
