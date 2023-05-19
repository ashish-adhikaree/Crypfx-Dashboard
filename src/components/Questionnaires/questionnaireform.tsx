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

type PROPS = {
  formData: any;
  setFormData: React.Dispatch<any>;
  handleSubmit?: () => void;
  handleCancel?: () => void;
  type: string;
  disableAction?: boolean
};
const QuestionnaireForm: React.FC<PROPS> = ({
  formData,
  setFormData,
  handleSubmit,
  handleCancel,
  type,
  disableAction = false
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
        title="Questionnaires"
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
                  <FormControlLabel
                    checked={
                      formData.account
                        ? formData.account === "$280,000 Funded"
                        : accountType === "$280,000 Funded"
                    }
                    onChange={handleAccountTypeChange}
                    value="$280,000 Funded"
                    label="$280,000 Funded"
                    name="radio-button-demo"
                    control={<CustomRadio />}
                  />
                  <FormControlLabel
                    checked={
                      formData.account
                        ? formData.account === "$80,000 Funded"
                        : accountType === "$80,000 Funded"
                    }
                    onChange={handleAccountTypeChange}
                    value="$80,000 Funded"
                    label="$80,000 Funded"
                    control={<CustomRadio />}
                    name="radio-button-demo"
                  />
                </Box>
              </FormControl>
            </Grid>
          </Grid>
          <Alert severity="info">Questions</Alert>
          <Grid container spacing={3} mb={3} mt={1}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="tradehistory-text"
              >
                How long have you been trading forex?
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, tradingperiod: e.target.value });
                }}
                value={formData.tradingperiod ? formData.tradingperiod : ""}
                id="tradehistory-text"
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="tradertype-text"
              >
                What type of trader are you? (Scalper etc)
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, tradertype: e.target.value });
                }}
                value={formData.tradertype ? formData.tradertype : ""}
                id="tradertype-text"
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="avgmonthlygain-text"
              >
                What's your average monthly gain in the past 6 months?
                (percentage)
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({
                    ...formData,
                    averagemonthlygain: e.target.value,
                  });
                }}
                value={
                  formData.averagemonthlygain ? formData.averagemonthlygain : ""
                }
                id="avgmonthlygain-text"
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="risk-text"
              >
                How much do you risk per trade? (In percentage)
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, riskpercentage: e.target.value });
                }}
                value={formData.riskpercentage ? formData.riskpercentage : ""}
                id="risk-text"
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="currencypair-text"
              >
                What currency pair do you trade the most?
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, currencypair: e.target.value });
                }}
                value={formData.currencypair ? formData.currencypair : ""}
                id="currencypair-text"
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="currentbroker-text"
              >
                What is the broker that you are currently trading with?
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, forexbroker: e.target.value });
                }}
                value={formData.forexbroker ? formData.forexbroker : ""}
                id="currentbroker-text"
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="tradingjourney-text"
              >
                Can you describe your trading journey?
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, tradingjourney: e.target.value });
                }}
                value={formData.tradingjourney ? formData.tradingjourney : ""}
                id="tradingjourney-text"
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="accountsize-text"
              >
                What's the current account size that you are trading with?
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({
                    ...formData,
                    currentaccountsize: e.target.value,
                  });
                }}
                value={
                  formData.currentaccountsize ? formData.currentaccountsize : ""
                }
                id="tradingjourney-text"
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="fundingpgrmneed-text"
              >
                Why do you need our funding program?
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, whyneedus: e.target.value });
                }}
                value={formData.whyneedus ? formData.whyneedus : ""}
                id="fundingpgrmneed-text"
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
        </>
      </ParentCard>
    </div>
  );
};

export default QuestionnaireForm;
