import React, { useContext, useEffect, useState } from "react";
import WithdrawForm from "../../src/components/Withdrawal/withdrawform";
import { Grid, Typography } from "@mui/material";
import Breadcrumb from "../../src/layouts/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "../../src/components/container/Pagecontainer";
import { AuthContext } from "../../context";
import CustomTable from "../../src/components/table";
import axios from "axios";
import Head from "next/head";
import { errorToast, successToast } from "../../customToasts";

const ADMINCOLS = [
  "TRADER ID",
  "TRADER NAME",
  "AMOUNT",
  "CRYPTOCURRENCY",
  "ADDRESS",
  "STATUS",
  "REQUESTED ON",
];

const CUSTOMERWITHDRAWHISTORYCOLS = [
  "TRADER ID",
  "AMOUNT",
  "CRYPTOCURRENCY",
  "ADDRESS",
  "STATUS",
  "REQUESTED ON",
];

const Withdrawal = () => {
  const { type, userid } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState<any>({});
  const [withdrawals, setWithdrawals] = useState([]);

  const getAllWithdrawals = async () => {
    const { data } = await axios.get("/api/getAllWithdrawals");
    if (data.status === "success") {
      setData(data.data);
    }
  };

  const getWithdrawalsHistory = async () => {
    const { data } = await axios.post("/api/getWithdrawalHistory", {
      userid: userid,
    });
    if (data.status === "success") {
      console.log(data.withdrawals);
      setWithdrawals(data.withdrawals);
    }
  };

  const requestWithdraw = async () => {
    if (
      formData.amount &&
      formData.cryptocurrency &&
      formData.cryptocurrency.length !== 0 &&
      formData.address
    ) {
      const { data } = await axios.post("/api/requestWithdraw", formData);
      if (data.status === "success") {
        setFormData({});
        successToast(data.message);
        getWithdrawalsHistory();
      } else if (data.status === "error") {
        errorToast(data.message);
      }
    } else {
      errorToast("Fill up the form first");
    }
  };

  useEffect(() => {
    if (type === "Admin") {
      getAllWithdrawals();
    } else if (type === "Customer") {
      getWithdrawalsHistory();
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
              <WithdrawForm
                formData={formData}
                setFormData={setFormData}
                requestWithdraw={requestWithdraw}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <WithdrawalHistory /> */}
              <CustomTable
                title="Withdraw History"
                columns={CUSTOMERWITHDRAWHISTORYCOLS}
                data={withdrawals}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
      {type === "Admin" ? (
        <>
          <CustomTable
            title="All Withdrawals"
            columns={ADMINCOLS}
            data={data}
            getAllWithdrawals = {getAllWithdrawals}
          />
        </>
      ) : (
        <></>
      )}
    </PageContainer>
  );
};

export default Withdrawal;
