import React from "react";
import WithdrawalHistory from "../src/components/Withdrawal/withdrawalhistory";
import WithdrawForm from "../src/components/Withdrawal/withdrawform";
import { Grid } from "@mui/material";
import Breadcrumb from "../src/layouts/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "../src/components/container/Pagecontainer";

const Withdrawal = () => {
  return (
    <PageContainer
    title="Withdraw | Crypfx"
    description="This is Withdrawal page"
  >
    <Grid container spacing={3} paddingTop={3}>
      <Grid item xs={12} md={8} lg={6}>
        <WithdrawForm />
      </Grid>
      <Grid item xs={12}>
        <WithdrawalHistory />
      </Grid>
    </Grid>
    </PageContainer>
  );
};

export default Withdrawal;
