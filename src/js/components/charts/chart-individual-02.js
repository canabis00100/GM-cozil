import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartIndividual02 - Crescimento de Consumo (Line Chart pequeno)
const chartIndividual02 = () => {
  const theme = getThemeColors();
  
  const chartOptions = {
    series: [
      {
        name: "Crescimento",
        data: [3500, 3600, 3700, 3750, 3768],
      },
    ],
    colors: ["#10B981"],
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
          return val.toLocaleString('pt-BR');
        },
      },
    },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
  };

  const chartSelector = document.querySelectorAll("#chartIndividual02");
  if (chartSelector.length) {
    const chart = new ApexCharts(document.querySelector("#chartIndividual02"), chartOptions);
    chart.render();
    window.chartIndividual02Instance = chart;
  }
};

export default chartIndividual02;

