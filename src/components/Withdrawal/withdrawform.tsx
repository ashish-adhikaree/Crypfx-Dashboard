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
import Image from "next/image";
import { CURRENCIES } from "../../constants";

const WithdrawForm: React.FC<{
  formData: any;
  setFormData: React.Dispatch<any>;
  requestWithdraw: () => void;
}> = ({ formData, setFormData, requestWithdraw }) => {
  const [currency, setCurrency] = React.useState("");

  const handleCurrencyChange = (event: any) => {
    setCurrency(event.target.value);
    setFormData({ ...formData, cryptocurrency: event.target.value });
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
              onClick={() => {
                setCurrency("");
                setFormData({});
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={requestWithdraw}
            >
              Submit
            </Button>
          </>
        }
      >
        <>
          <Alert severity="info">Available Payout: -</Alert>
          <Box>
            <Box>
              <CustomFormLabel htmlFor="fname-text">
                Amount (in USD)
              </CustomFormLabel>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <CustomTextField
                  value={formData.amount ? formData.amount : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData({ ...formData, amount: e.target.value });
                  }}
                  sx={{
                    minWidth: {
                      xs: "100%",
                    },
                  }}
                  placeholder="0.00"
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
                onChange={handleCurrencyChange}
                fullWidth
                variant="outlined"
              >
                {CURRENCIES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Image height={20} src={option.img} alt={option.label} />
                      <span>{option.label}</span>
                    </div>
                  </MenuItem>
                ))}
              </CustomSelect>
              <CustomFormLabel htmlFor="fname-text">Address</CustomFormLabel>
              <CustomTextField
                placeholder="Wallet Address"
                value={formData.address ? formData.address : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, address: e.target.value });
                }}
                id="fname-text"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Box>
        </>
      </ParentCard>
    </div>
  );
};

export default WithdrawForm;
