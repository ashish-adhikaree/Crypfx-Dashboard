import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
const WelcomeCard: React.FC<{ type: string; fullname: string }> = ({
  type,
  fullname,
}) => {
  const router = useRouter();
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
          }}
        >
          {type == "Customer" ? (
            <>
              <Typography variant="h5">
                Welcome back{" "}
                <span style={{ textTransform: "capitalize" }}>{fullname}</span>!
              </Typography>
              <Typography variant="subtitle2" my={2} color="textSecondary">
                Complete the questionnaires if you are serious about getting our
                funded account as our accounts are limited.
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
                  router.push("/questionnaires");
                }}
              >
                Complete now
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
