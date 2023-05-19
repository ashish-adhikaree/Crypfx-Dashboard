import { Box, Grid } from "@mui/material";
import PageContainer from "../src/components/container/Pagecontainer";
import AreaGraph from "../src/components/Dashboard/areagraph";
import WelcomeCard from "../src/components/Dashboard/welcomecard";
import Objectives from "../src/components/Dashboard/objectives";
import TradeTable from "../src/components/Dashboard/tradetable";
import StatsTable from "../src/components/Dashboard/statstable";
import AvailablePayoutIcon from "../public/images/icons/available-payout.png";
import FundingIcon from "../public/images/icons/funding.png";
import ProfitChart from "../src/components/Dashboard/profitchart";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context";
import TopCards from "../src/components/Dashboard/adminCards";
import axios from "axios";
import Head from "next/head";

export default function Home() {
  const { fullname, type } = useContext(AuthContext);
  const [stats, setStats] = useState<any>();
  const getStats = async () => {
    const { data } = await axios.get("/api/getStatistics");
    if (data.status === "success") {
      setStats(data.stats);
    }
  };

  useEffect(() => {
    if (type === "Admin") {
      getStats();
    }
  }, []);

  return (
    <PageContainer
      title="Dashboard | Crypfx"
      description="This is dashboard page"
    >
      <Head>
        <title>Dashboard | Crypfx</title>
      </Head>
      <Grid container spacing={3} paddingTop={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} padding={0}>
              <WelcomeCard type={type} fullname={fullname} />
            </Grid>
            {type === "Admin" && stats && (
              <Grid item xs={12} lg={6}>
                <TopCards stats={stats}/>
              </Grid>
            )}
            {type === "Customer" && (
              <>
                <Grid item xs={12} sm={6} lg={3}>
                  <AreaGraph title="Funding Capital" icon={FundingIcon} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <AreaGraph
                    title="Available Payout"
                    icon={AvailablePayoutIcon}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        {type === "Customer" && (
          <>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={4}>
                  <Objectives />
                </Grid>
                <Grid item xs={12} sm={6} lg={8}>
                  <ProfitChart />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <StatsTable />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TradeTable />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </PageContainer>
  );
}
