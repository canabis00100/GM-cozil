import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartIndividual01 - Taxa de Utilização (Line Chart pequeno)
const chartIndividual01 = () => {
  const theme = getThemeColors();
  
  const chartOptions = {
    series: [
      {
        name: "Utilização",
        data: [3.5, 3.8, 4.0, 4.2, 4.1, 4.3, 4.26],
      },
    ],
    colors: ["#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 100,
      type: "line",
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.tooltipTheme,
      fixed: { enabled: false },
      x: { show: false },
      y: {
        formatter: function (val) {
          return val.toFixed(2) + "%";
        },
      },
    },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
  };

  const chartSelector = document.querySelectorAll("#chartIndividual01");
  if (chartSelector.length) {
    const chart = new ApexCharts(document.querySelector("#chartIndividual01"), chartOptions);
    chart.render();
    window.chartIndividual01Instance = chart;
  }
};

export default chartIndividual01;

