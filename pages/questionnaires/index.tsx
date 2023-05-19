import React, { useContext, useEffect, useState } from "react";
import QuestionnaireForm from "../../src/components/Questionnaires/questionnaireform";
import { Grid, Typography } from "@mui/material";
import PageContainer from "../../src/components/container/Pagecontainer";
import axios from "axios";
import { AuthContext } from "../../context";
import { errorToast, successToast } from "../../customToasts";
import { useRouter } from "next/router";
import Head from "next/head";

const Questionnaire = () => {
  const [formData, setFormData] = useState<any>({});
  const [showEmptyForm, setShowEmptyForm] = useState(false);
  const { userid, type } = useContext(AuthContext);
  const router = useRouter();
  const [Questionnaires, setQuestionnaires] = useState<any>([]);
  const getQuestionnaires = async () => {
    const { data } = await axios.post("/api/getQuestionnaires", {
      userid: userid,
    });
    if (data.status === "success") {
      const temp = data.questionnaires;
      console.log(temp);
      setQuestionnaires(temp);
      const isUnderRevieworAccepted = temp.filter(
        (data: any) =>
          data.status == "Under Review" || data.status == "Accepted"
      );
      if (temp.length === 0) {
        setShowEmptyForm(true);
      } else if (isUnderRevieworAccepted) {
        setShowEmptyForm(false);
      } else {
        const isRejected = temp.filter(
          (data: any) => data.status == "Rejected"
        );
        if (isRejected && isRejected.length !== 0) {
          setShowEmptyForm(true);
        }
      }
    }
  };

  useEffect(() => {
    getQuestionnaires();
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
      const { data } = await axios.post("/api/submitQuestionnaires", {
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
      title="Questionnaires | Crypfx"
      description="This is Questionnaires page"
    >
      <Head>
        <title>Questionnaires | Crypfx</title>
      </Head>
      {type === "Customer" ? (
        <>
          <Grid container spacing={3} paddingTop={3}>
            <Grid item>
              {showEmptyForm && (
                <QuestionnaireForm
                  formData={formData}
                  setFormData={setFormData}
                  handleSubmit={handleSubmit}
                  handleCancel={handleCancel}
                  type="Customer"
                  disableAction={false}
                />
              )}
              {Questionnaires.map((data: any) => {
                return (
                  <QuestionnaireForm
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

export default Questionnaire;
