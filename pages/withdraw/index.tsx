import React, { useContext, useEffect, useState } from "react";
import WithdrawalHistory from "../../src/components/Withdrawal/withdrawalhistory";
import WithdrawForm from "../../src/components/Withdrawal/withdrawform";
import { Grid, Typography } from "@mui/material";
import Breadcrumb from "../../src/layouts/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "../../src/components/container/Pagecontainer";
import { AuthContext } from "../../context";
import CustomTable from "../../src/components/table";
import axios from "axios";
import Head from "next/head";

const columns = [
  "TRADER",
  "AMOUNT",
  "CRYPTOCURRENCY",
  "ADDRESS",
  "STATUS",
  "ADDED AT",
];

const Withdrawal = () => {
  const { type } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const getAllWithdrawals = async () => {
    const { data } = await axios.get("/api/getAllWithdrawals");
    console.log(data.data)
    setData(data.data);
  };

  useEffect(() => {
    if (type === "Admin") {
      getAllWithdrawals();
    }
  }, []);
  return (
    <PageContainer
      title="Withdraw | Crypfx"
      description="This is Withdrawal page"
    >
       <Head>
        <title>Withdrawals | Crypfx</title>
      </Head>
      {type === "Customer" ? (
        <>
          <Grid container spacing={3} paddingTop={3}>
            <Grid item xs={12} md={8} lg={6}>
              <WithdrawForm />
            </Grid>
            <Grid item xs={12}>
              <WithdrawalHistory />
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
      {type === "Admin" ? (
        <>
          <CustomTable title="All Withdrawals" columns={columns} data={data} />
        </>
      ) : (
        <></>
      )}
    </PageContainer>
  );
};

export default Withdrawal;
