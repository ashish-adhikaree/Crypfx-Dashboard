import React, { useContext, useEffect, useState } from "react";
import ApplicationForm from "../../src/components/Applications/applicationform";
import { Grid, Typography } from "@mui/material";
import PageContainer from "../../src/components/container/Pagecontainer";
import axios from "axios";
import { AuthContext } from "../../context";
import { errorToast, successToast } from "../../customToasts";
import { useRouter } from "next/router";
import Head from "next/head";

const Application = () => {
  const [formData, setFormData] = useState<any>({});
  const [showEmptyForm, setShowEmptyForm] = useState(false);
  const { userid, type } = useContext(AuthContext);
  const router = useRouter();
  const [Applications, setApplications] = useState<any>([]);
  const getApplications = async () => {
    const { data } = await axios.post("/api/getApplications", {
      userid: userid,
    });
    if (data.status === "success") {
      const temp = data.applications;
      setApplications(temp);
      const isUnderRevieworAccepted = temp.filter(
        (row: any) => row.status == "Under Review" || row.status == "Accepted"
      );
      if (temp.length === 0) {
        setShowEmptyForm(true);
      } else if (
        isUnderRevieworAccepted &&
        isUnderRevieworAccepted.length !== 0
      ) {
        setShowEmptyForm(false);
      } else {
        const isRejected = temp.filter((row: any) => row.status == "Rejected");
        console.log(isRejected);
        if (isRejected && isRejected.length !== 0) {
          setShowEmptyForm(true);
        }
      }
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  const handleSubmit = async () => {
    if (
      formData.fullname &&
      formData.email &&
      formData.country &&
      formData.account &&
      formData.tradingperiod &&
      formData.tradertype &&
      formData.averagemonthlygain &&
      formData.riskpercentage &&
      formData.currencypair &&
      formData.forexbroker &&
      formData.tradingjourney &&
      formData.currentaccountsize &&
      formData.whyneedus
    ) {
      const { data } = await axios.post("/api/submitApplication", {
        userid,
        ...formData,
      });
      if (data.status === "success") {
        setFormData({});
        successToast(data.message);
        router.reload();
      } else if (data.status === "error") {
        errorToast(data.message);
      }
    } else {
      errorToast("Please fill up the form first");
    }
  };

  const handleCancel = () => {
    setFormData({});
  };

  if (type === "Admin") {
    router.push("/");
    return <></>;
  }

  return (
    <PageContainer
      title="Applications | Crypfx"
      description="This is Applications page"
    >
      <Head>
        <title>Application | Crypfx</title>
      </Head>
      {type === "Customer" ? (
        <>
          <Grid container spacing={3} paddingTop={3}>
            <Grid item>
              {showEmptyForm && (
                <ApplicationForm
                  formData={formData}
                  setFormData={setFormData}
                  handleSubmit={handleSubmit}
                  handleCancel={handleCancel}
                  type="Customer"
                  disableAction={false}
                />
              )}
              {Applications.map((data: any, index: number) => {
                return (
                  <ApplicationForm
                    key={data.customer + index}
                    formData={data}
                    setFormData={() => {}}
                    type="Customer"
                    disableAction={true}
                  />
                );
              })}
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </PageContainer>
  );
};

export default Application;
