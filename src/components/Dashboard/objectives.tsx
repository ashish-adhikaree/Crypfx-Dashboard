import { Stack, Typography, Avatar, Box } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { IconGridDots } from "@tabler/icons-react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import MaxLotIcon from "../../../public/images/icons/configuration.png";
const Objectives = () => {
  const stats = [
    {
      title: "Gain Target",
      percent: "+7%",
      color: "#3a3a3a",
      lightcolor: "rgba(58, 58, 58, .15)",
      icon: <TrendingUpRoundedIcon width={18} />,
    },
    {
      title: "Profit Share",
      percent: "-",
      color: "#3a3a3a",
      lightcolor: "rgba(58, 58, 58, .15)",
      icon: <MonetizationOnRoundedIcon width={18} />,
    },
    {
      title: "Drawdown",
      percent: "-",
      color: "#3a3a3a",
      lightcolor: "rgba(58, 58, 58, .15)",
      icon: <ArrowDownwardRoundedIcon width={18} />,
    },
    {
      title: "Max Lot exposure",
      percent: "-",
      color: "#3a3a3a",
      lightcolor: "rgba(58, 58, 58, .15)",
      icon: null,
    },
    {
      title: "Starting Time",
      percent: "-",
      color: "#3a3a3a",
      lightcolor: "rgba(58, 58, 58, .15)",
      icon: <AccessTimeRoundedIcon width={18} />,
    },
    {
      title: "End Time",
      percent: "-",
      color: "#3a3a3a",
      lightcolor: "rgba(58, 58, 58, .15)",
      icon: <AccessTimeRoundedIcon width={18} />,
    },
  ];

  return (
    <DashboardCard title="Objectives">
      <>
        <Stack spacing={3} mt={3}>
          {stats.map((stat, i) => (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              key={i}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                {stat.title === "Max Lot exposure" ? (
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: stat.lightcolor,
                      color: stat.color,
                      width: 40,
                      height: 40,
                    }}
                    src={MaxLotIcon.src}
                  />
                ) : (
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: stat.lightcolor,
                      color: stat.color,
                      width: 40,
                      height: 40,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                )}
                <Box>
                  <Typography variant="h6" mb="4px">
                    {stat.title}
                  </Typography>
                  {/* <Typography variant="subtitle2" color="textSecondary">
                    {stat.subtitle }
                  </Typography> */}
                </Box>
              </Stack>
              <Avatar
                sx={{
                  bgcolor: stat.lightcolor,
                  color: stat.color,
                  width: 42,
                  height: 24,
                  borderRadius: "4px",
                }}
              >
                <Typography variant="subtitle2" fontWeight="600">
                  {stat.percent}
                </Typography>
              </Avatar>
            </Stack>
          ))}
        </Stack>
      </>
    </DashboardCard>
  );
};

export default Objectives;
