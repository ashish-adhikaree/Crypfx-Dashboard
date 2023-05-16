import { Box, Grid } from "@mui/material";
import PageContainer from "../src/components/container/Pagecontainer";
import AreaGraph from "../src/components/Dashboard/areagraph";
import WelcomeCard from "../src/components/Dashboard/welcomecard";
import Objectives from "../src/components/Dashboard/objectives";
import TradeTable from "../src/components/Dashboard/tradetable";
import StatsTable from "../src/components/Dashboard/statstable";
import AvailablePayoutIcon from "../public/images/icons/available-payout.png"
import FundingIcon from "../public/images/icons/funding.png"
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Sample Page",
  },
];

export default function Home() {
  return (
    <PageContainer title="Dashboard" description="This is dashboard page">
      <Grid container spacing={3} paddingTop={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} padding={0}>
              <WelcomeCard />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <AreaGraph title="Funding Capital" icon = {FundingIcon}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <AreaGraph title="Available Payout" icon = {AvailablePayoutIcon}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm={6} lg={4}>
              <Objectives />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing = {3}>
            <Grid item xs={12} md={6}>
              <StatsTable />
            </Grid>
            <Grid item xs={12} md={6}>
              <TradeTable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}