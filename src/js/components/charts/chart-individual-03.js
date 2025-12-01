import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartIndividual03 - Performance do Produto (Bar Chart pequeno)
const chartIndividual03 = () => {
  const theme = getThemeColors();
  
  const chartOptions = {
    series: [
      {
        name: "Consumo",
        data: [160, 190, 180, 220, 200, 240, 210],
      },
    ],
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 120,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: {
      theme: theme.tooltipTheme,
      y: {
        formatter: function (val) {
          return val + " unidades";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartIndividual03");
  if (chartSelector.length) {
    const chart = new ApexCharts(document.querySelector("#chartIndividual03"), chartOptions);
    chart.render();
    window.chartIndividual03Instance = chart;
  }
};

export default chartIndividual03;

