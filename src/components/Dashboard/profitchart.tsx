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
    colors: [
      primarylight,
      primarylight,
      primary,
      primarylight,
      primarylight,
      primarylight,
    ],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "45%",
        distributed: true,
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: [["Apr"], ["May"], ["June"], ["July"], ["Aug"], ["Sept"]],
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
  };
  const seriescolumnchart = [
    {
      name: "",
      data: [20, 15, 30, 25, 10, 15],
    },
  ];

  return (
    <DashboardWidgetCard
      title="Employee Salary"
      subtitle="Every month"
      dataLabel1="Salary"
      dataItem1="$36,358"
      dataLabel2="Profit"
      dataItem2="$5,296"
    >
      <>
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          height={280}
          width={"100%"}
        />
      </>
    </DashboardWidgetCard>
  );
};

export default ProfitChart;
