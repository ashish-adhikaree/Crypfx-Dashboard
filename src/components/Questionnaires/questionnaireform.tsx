import React from "react";
import {
  Box,
  FormControlLabel,
  Button,
  Grid,
  MenuItem,
  FormControl,
  Alert,
} from "@mui/material";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import CustomSelect from "../forms/theme-elements/CustomSelect";
import CustomRadio from "../forms/theme-elements/CustomRadio";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import ParentCard from "../shared/ParentCard";

const QuestionnaireForm = () => {
  const [currency, setCurrency] = React.useState("");

  const handleChange2 = (event: any) => {
    setCurrency(event.target.value);
  };

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange3 = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const [country, setCountry] = React.useState("");

  const handleChange4 = (event: any) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <ParentCard
        title="Questionnaires"
        footer={
          <>
            <Button
              variant="contained"
              color="error"
              sx={{
                mr: 1,
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </>
        }
      >
        <>
          <Alert severity="warning">
            Please fill the Questionnaires Below
            <p>
              Once your request is approved, you will receive the following
              information: Broker, MT4 Server, MT4 Account Number, Password
            </p>
          </Alert>
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
              <CustomTextField id="country-text" variant="outlined" fullWidth />
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
                    checked={selectedValue === "a"}
                    onChange={handleChange3}
                    value="a"
                    label="$280,000 Funded"
                    name="radio-button-demo"
                    control={<CustomRadio />}
                  />
                  <FormControlLabel
                    checked={selectedValue === "b"}
                    onChange={handleChange3}
                    value="b"
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
