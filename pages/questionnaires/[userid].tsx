import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import QuestionnaireForm from "../../src/components/Questionnaires/questionnaireform";
import { errorToast, successToast } from "../../customToasts";
import { AuthContext } from "../../context";
import CustomTextField from "../../src/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../src/components/forms/theme-elements/CustomFormLabel";

const IndividualQuestionnaire = () => {
  const router = useRouter();
  const userid = router.query.userid;
  const name = router.query.name;
  const { type } = useContext(AuthContext);
  const [isAlertOpen, setAlert] = useState(false);
  const [actionBtnClicked, setactionBtnClicked] = useState<string>();
  const [Questionnaires, setQuestionnaires] = useState<any>([]);
  const [rejectionMessage, setRejectionMessage] = useState<string>("");
  const getQuestionnaires = async () => {
    const { data } = await axios.post("/api/getQuestionnaires", {
      userid: userid,
    });
    if (data.status === "success") {
      setQuestionnaires(data.questionnaires);
    }
  };

  const changeStatus = async (status: string, message: string) => {
    const { data } = await axios.post("/api/changeQuestionnaireStatus", {
      userid: userid,
      status: status,
      message: message,
    });
    if (data.status === "success") {
      successToast(data.message);
      router.reload();
    } else if (data.status === "error") {
      errorToast(data.message);
    }
  };

  useEffect(() => {
    getQuestionnaires();
  }, []);

  return (
    <>
      <Head>
        <title>Questionnaires | Crypfx</title>
      </Head>
      <Modal
        open={isAlertOpen}
        onClose={() => {
          setAlert(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ background: "#ffffff", padding: "30px" }}>
          {actionBtnClicked === "Accept" && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to accept the Questionnaire?
              </Typography>
              <Box sx={{ marginTop: "30px" }}>
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{
                    mr: 1,
                  }}
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setAlert(false);
                    changeStatus(
                      "Accepted",
                      "Your questionnaire has been accepted."
                    );
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </>
          )}
          {actionBtnClicked === "Reject" && (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="error"
              >
                Are you sure you want to reject the Questionnaire?
              </Typography>
              <CustomFormLabel
                sx={{
                  mt: "30px",
                }}
                htmlFor="message-text"
              >
                Type the reason for rejecting the request
              </CustomFormLabel>
              <CustomTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRejectionMessage(e.target.value);
                }}
                placeholder="Enter your message"
                value={rejectionMessage}
                id="message-text"
                variant="outlined"
                fullWidth
                multiline
              />
              <Box sx={{ marginTop: "30px" }}>
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{
                    mr: 1,
                  }}
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setAlert(false);
                    changeStatus("Rejected", rejectionMessage);
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
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
          <Typography sx={{ textTransform: "capitalize" }} variant="h4">
            {name}'s Questionnaires
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setAlert(true);
                setactionBtnClicked("Reject");
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setAlert(true);
                setactionBtnClicked("Accept");
              }}
            >
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
