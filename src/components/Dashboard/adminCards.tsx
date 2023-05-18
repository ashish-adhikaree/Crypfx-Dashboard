import Image from "next/image";
import { Avatar, Box, CardContent, Grid, Typography } from "@mui/material";

import icon2 from "public/images/svgs/icon-user-male.svg";
import icon3 from "public/images/svgs/icon-briefcase.svg";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import { IconUser } from "@tabler/icons-react";

const topcards = [
  {
    icon: <IconUser width={24}/>,
    title: "Customers",
    digits: "16",
    bgcolor: "#000000",
  },
  {
    icon: <MonetizationOnRoundedIcon width={18}/>,
    title: "Withdrawals",
    digits: "4",
    bgcolor: "#000000",
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={6} lg={6} key={i}>
          <Box sx={{border: '1px solid #cfcfcf'}} textAlign="center">
            <CardContent>
              {/* <Image src={topcard.icon} alt={"topcard.icon"} width="50" /> */}
              <Box display="flex" justifyContent="center">
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "rgba(58, 58, 58, .15)",
                  color: "#3a3a3a",
                  width: 40,
                  height: 40,
                }}
              >
                {topcard.icon}
              </Avatar>
              </Box>
              <Typography
                color={topcard.bgcolor + ".main"}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography
                color={topcard.bgcolor + ".main"}
                variant="h4"
                fontWeight={600}
              >
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
