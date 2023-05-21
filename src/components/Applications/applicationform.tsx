import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Button,
  Grid,
  MenuItem,
  FormControl,
  Alert,
  Modal,
  Typography,
} from "@mui/material";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import CustomSelect from "../forms/theme-elements/CustomSelect";
import CustomRadio from "../forms/theme-elements/CustomRadio";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import ParentCard from "../shared/ParentCard";

const Questions = [
  {
    key: "tradingperiod",
    label: "How long have you been trading forex?",
  },
  {
    key: "tradedwithfunded",
    label:
      "Have you traded a funded account before? If so, which prop firm did you trade with?",
  },
  {
    key: "incomesourcebesidetrading",
    label:
      "Beside trading, do you have other businesses that generate an income for you?",
  },
  {
    key: "tradertype",
    label: "What type of trader are you? (Scalper etc)",
  },
  {
    key: "averagemonthlygain",
    label: "What's your average monthly gain in the past 6 months?",
  },
  {
    key: "riskpercentage",
    label: "How much do you risk per trade?",
  },
  {
    key: "currencypair",
    label: "What currency pair do you trade the most?",
  },
  {
    key: "currentbroker",
    label: "What is the broker that you are currently trading with?",
  },
  {
    key: "tradingjourney",
    label: "Can you describe your trading journey?",
  },
  {
    key: "currentaccountsize",
    label: "What's the current account size that you are trading with?",
  },
  {
    key: "whyneedus",
    label: "Why do you need our funding program?",
  },
];

type PROPS = {
  formData: any;
  setFormData: React.Dispatch<any>;
  handleSubmit?: () => void;
  handleCancel?: () => void;
  type: string;
  disableAction?: boolean;
};
const ApplicationForm: React.FC<PROPS> = ({
  formData,
  setFormData,
  handleSubmit,
  handleCancel,
  type,
  disableAction = false,
}) => {
  const [accountType, setAccountType] = useState("");
  const [isAlertOpen, setAlert] = useState(false);
  const status = formData.status ? formData.status : "Not Submitted";
  const message = formData.message
    ? formData.message
    : "Once your request is approved, you will receive the following information: Broker, MT4 Server, MT4 Account Number, Password";

  const handleAccountTypeChange = (event: any) => {
    setAccountType(event.target.value);
    setFormData({ ...formData, account: event.target.value });
  };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
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
            color="error"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Are you sure you want to cancel the progress?
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
              color="error"
              onClick={() => {
                if (handleCancel) {
                  handleCancel();
                }
                setAlert(false);
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      <Alert
        severity={
          status === "Not Submitted"
            ? "info"
            : status === "Under Review"
            ? "warning"
            : status === "Accepted"
            ? "success"
            : "error"
        }
        sx={{ marginBottom: "10px", marginTop: "20px" }}
      >
        <Typography>
          Status:&nbsp;<span>{status}</span>
        </Typography>
        <Typography>{message}</Typography>
      </Alert>
      <ParentCard
        title="Applications"
        footer={
          <>
            {type === "Customer" && !disableAction && (
              <>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    mr: 1,
                  }}
                  onClick={() => {
                    setAlert(true);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </>
            )}
          </>
        }
      >
        <>
          <Alert sx={{ marginTop: "10px" }} severity="info">
            Personal Information
          </Alert>
          <Grid container spacing={3} mb={3} mt={1}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="fname-text"
              >
                Your Full Legal Name
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, fullname: e.target.value });
                }}
                value={formData.fullname ? formData.fullname : ""}
                placeholder="John Doe"
                id="fname-text"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="email-text"
              >
                Your Email
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                value={formData.email ? formData.email : ""}
                placeholder="email@crypfxuk.com"
                id="email-text"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="country-text"
              >
                Country
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, country: e.target.value });
                }}
                value={formData.country ? formData.country : ""}
                id="country-text"
                variant="outlined"
                fullWidth
              />
              <CustomFormLabel
                sx={{
                  mt: '20px',
                }}
                htmlFor="birth-text"
              >
                Birth Date
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, birthdate: e.target.value });
                }}
                value={formData.birthdate ? formData.birthdate : ""}
                id="birth-text"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel sx={{ mt: 0 }}>
                Account you wish to obtain
              </CustomFormLabel>

              <FormControl
                sx={{
                  width: "100%",
                }}
              >
                <Box>
                  <p>No Application approval needed (Instant Funding)</p>
                  <FormControlLabel
                    checked={
                      formData.account
                        ? formData.account === "$10,000 Funded"
                        : accountType === "$10,000 Funded"
                    }
                    onChange={handleAccountTypeChange}
                    value="$10,000 Account"
                    label="$10,000 Account"
                    control={<CustomRadio />}
                    name="radio-button-demo"
                  />
                  <FormControlLabel
                    checked={
                      formData.account
                        ? formData.account === "$25,000 Account"
                        : accountType === "$25,000 Account"
                    }
                    onChange={handleAccountTypeChange}
                    value="$25,000 Account"
                    label="$25,000 Account"
                    name="radio-button-demo"
                    control={<CustomRadio />}
                  />
                </Box>
                <Box>
                  <p>Admin's Approval is needed</p>

                  <FormControlLabel
                    checked={
                      formData.account
                        ? formData.account === "$280,000 Account"
                        : accountType === "$280,000 Account"
                    }
                    onChange={handleAccountTypeChange}
                    value="$280,000 Account"
                    label="$280,000 Account"
                    name="radio-button-demo"
                    control={<CustomRadio />}
                  />
                  <FormControlLabel
                    checked={
                      formData.account
                        ? formData.account === "$80,000 Account"
                        : accountType === "$80,000 Account"
                    }
                    onChange={handleAccountTypeChange}
                    value="$80,000 Account"
                    label="$80,000 Account"
                    control={<CustomRadio />}
                    name="radio-button-demo"
                  />
                </Box>
              </FormControl>
            </Grid>
          </Grid>
          <Alert severity="info">Questions<p>The more details you provide, the better.</p></Alert>
          <Grid container spacing={3} mb={3} mt={1}>
            {Questions.map((question) => {
              return (
                <Grid key={question.key} item lg={6} md={12} sm={12} xs={12}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor={question.key}
                  >
                    {question.label}
                  </CustomFormLabel>
                  <CustomTextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData({
                        ...formData,
                        [question.key]: e.target.value,
                      });
                    }}
                    value={formData[question.key] ? formData[question.key] : ""}
                    id={question.key}
                    variant="outlined"
                    fullWidth
                    multiline
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      </ParentCard>
    </div>
  );
};

export default ApplicationForm;
