import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";

import DashboardWidgetCard from "../shared/DashboardWidgetCard";

const ProfitChart = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.grey[100];

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 280,
    },
    colors: [primary, "rgba(58, 58, 58, .15)"],
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "40%",
        endingShape: "rounded",
      },
    },

    dataLabels: {
      enabled: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: [
        ["12th May"],
        ["13th May"],
        ["14th May"],
        ["15th May"],
        ["16th May"],
        ["17th May"],
      ],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
    legend: {
      show: true,
      position: "bottom",
      width: "50px",
    },
  };
  const seriescolumnchart = [
    {
      name: "Gain",
      data: [20, 15, 30, 25, 10, 15],
      // data: [],
    },
    {
      name: "Drawdown",
      data: [10, 12, 5, 9, 11, 13],
      // data: [],
    },
  ];

  return (
    <DashboardWidgetCard
      title="Gain and Drawdown"
      subtitle="Every day"
      dataLabel1="Total Gain"
      dataItem1="-"
      dataLabel2="Total Drawdown"
      dataItem2="-"
      height="100%"
    >
      <div style={{ position: "relative" }}>
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          height={280}
          width={"100%"}
        />
        {seriescolumnchart[0].data.length === 0 &&
          seriescolumnchart[1].data.length === 0 && (
            <div
              style={{
                position: "absolute",
                top: "65px",
                right: "50%",
                transform: "translateX(50%)",
                fontWeight: "500",
                color: "gray",
              }}
            >
              No data to show
            </div>
          )}
      </div>
    </DashboardWidgetCard>
  );
};

export default ProfitChart;
