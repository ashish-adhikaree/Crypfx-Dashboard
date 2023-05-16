import React from "react";
import QuestionnaireForm from "../src/components/Questionnaires/questionnaireform";
import { Grid } from "@mui/material";
import PageContainer from "../src/components/container/Pagecontainer";

const Questionnaire = () => {
  return (
    <PageContainer
      title="Questionnaires | Crypfx"
      description="This is Questionnaires page"
    >
      <Grid container spacing={3} paddingTop={3}>
        <Grid item>
          <QuestionnaireForm />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Questionnaire;
