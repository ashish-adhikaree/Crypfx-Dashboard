import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const WelcomeCard: React.FC<{ type: string; fullname: string }> = ({
  type,
  fullname,
}) => {
  const router = useRouter();
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const getWelcomeMessage = async () => {
    const { data } = await axios.get("/api/getWelcomeMessage");
    if (data.status === "success") {
      setWelcomeMessage(data.welcomemsg);
    } else if (data.status === "error") {
      console.log(data.message);
    }
  };
  useEffect(() => {
    if (type === "Customer") {
      getWelcomeMessage();
    }
  }, []);
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        py: 0,
        height: "100%",
        position: "relative",
      }}
    >
      <CardContent
        sx={{
          position: "relative",
          zIndex: 40,
          padding: 0,
          margin: 0,
          minHeight: "100%",
          paddingBottom: "0 !important",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            margin: 0,
            paddingBlock: '30px'
          }}
        >
          {type == "Customer" ? (
            <>
              <Typography variant="h5">
                Welcome back{" "}
                <span style={{ textTransform: "capitalize" }}>{fullname}</span>!
              </Typography>
              <Typography variant="subtitle2" my={2} color="textSecondary">
                {welcomeMessage}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3a3a3a",
                  "&:hover": {
                    backgroundColor: "#3a3a3a",
                  },
                }}
                onClick={() => {
                  router.push("/application");
                }}
              >
                Complete Application
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5" padding={5}>
                Welcome{" "}
                <span style={{ textTransform: "capitalize" }}>{fullname}!</span>
              </Typography>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
