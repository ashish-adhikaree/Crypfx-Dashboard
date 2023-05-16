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
import CustomRadio from "../forms//theme-elements/CustomRadio";
import CustomFormLabel from "../forms//theme-elements/CustomFormLabel";
import ParentCard from "../shared/ParentCard";
import xrp from "../../../public/images/cryptocurrencies/xrp.png";
import trx from "../../../public/images/cryptocurrencies/trx.png";
import bnb from "../../../public/images/cryptocurrencies/bnb.png";
import busd from "../../../public/images/cryptocurrencies/busd.png";
import Image from "next/image";
const currencies = [
  {
    value: "XRP - Ripple",
    label: "XRP - Ripple",
    img: xrp,
  },
  {
    value: "TRX - TRON",
    label: "TRX - TRON",
    img: trx,
  },
  {
    value: "BNB - Binance Coin",
    label: "BNB - Binance Coin",
    img: bnb,
  },
  {
    value: "BUSD - Binance USD",
    label: "BUSD - Binance USD",
    img: busd,
  },
];

const WithdrawForm = () => {
  const [currency, setCurrency] = React.useState("");

  const handleChange2 = (event: any) => {
    setCurrency(event.target.value);
  };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <ParentCard
        title="Request Withdraw"
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
          <Alert severity="info">Available Payout: $0</Alert>
          <form>
            <Grid container spacing={3} mb={3}>
              <Grid item lg={12} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Amount</CustomFormLabel>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <p style={{ fontWeight: "500", fontSize: "20px" }}>$</p>
                  <CustomTextField
                    placeholder="XXX"
                    id="fname-text"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <CustomFormLabel htmlFor="standard-select-currency">
                  Cryptocurrency
                </CustomFormLabel>
                <CustomSelect
                  id="standard-select-currency"
                  value={currency}
                  onChange={handleChange2}
                  fullWidth
                  variant="outlined"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Image height = {20} src = {option.img} alt= {option.label}/>
                        <span>{option.label}</span>
                      </div>
                    </MenuItem>
                  ))}
                </CustomSelect>
                <CustomFormLabel htmlFor="fname-text">Address</CustomFormLabel>
                <CustomTextField
                  placeholder="Wallet Address"
                  id="fname-text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </>
      </ParentCard>
    </div>
  );
};

export default WithdrawForm;
