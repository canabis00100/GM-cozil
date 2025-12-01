import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartIndividual05 - Consumo Mensal (Bar Chart)
const chartIndividual05 = () => {
  const theme = getThemeColors();
  
  const chartOptions = {
    series: [
      {
        name: "Consumo",
        data: [160, 190, 180, 220, 200, 240, 210, 190, 230, 250, 220, 200],
      },
    ],
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 280,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        style: {
          colors: theme.textColor,
          fontSize: "11px",
        },
        rotate: -45,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.textColor,
        },
      },
    },
    grid: {
      borderColor: theme.gridColor,
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: theme.tooltipTheme,
      y: {
        formatter: function (val) {
          return val + " unidades";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartIndividual05");
  if (chartSelector.length) {
    const chart = new ApexCharts(document.querySelector("#chartIndividual05"), chartOptions);
    chart.render();
    window.chartIndividual05Instance = chart;
  }
};

export default chartIndividual05;

