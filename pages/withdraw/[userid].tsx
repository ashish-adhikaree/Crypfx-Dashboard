import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import QuestionnaireForm from "../../src/components/Questionnaires/questionnaireform";
import { errorToast, successToast } from "../../customToasts";
import { AuthContext } from "../../context";

const IndividualQuestionnaire = () => {
  const router = useRouter();
  const userid = router.query.userid;
  const name = router.query.name;
  const { type } = useContext(AuthContext);
  const [Questionnaires, setQuestionnaires] = useState<any>([]);
  const getQuestionnaires = async () => {
    const { data } = await axios.post("/api/getQuestionnaires", {
      userid: userid,
    });
    if (data.status === "success") {
      setQuestionnaires(data.questionnaires);
    }
  };

  useEffect(() => {
    getQuestionnaires();
  }, []);

  return (
    <>
      <Head>
        <title>WithDrawals | Crypfx</title>
      </Head>
      <Box>
        {/* Header  */}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography sx={{textTransform: 'capitalize'}} variant="h4">{name}'s Questionnaires</Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="error">
              Reject
            </Button>
            <Button variant="contained" color="primary">
              Accept
            </Button>
          </Box>
        </Box>
        {/* form  */}
        <Box marginTop={5}>
          {Questionnaires.length === 0 ? (
            <p>Hasn't submitted questionnaires yet</p>
          ) : (
            Questionnaires.map((formData: any) => {
              return (
                <QuestionnaireForm
                  key={formData.id}
                  formData={formData}
                  setFormData={() => {}}
                  type={type}
                />
              );
            })
          )}
        </Box>
      </Box>
    </>
  );
};

export default IndividualQuestionnaire;
