import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartIndividual04 - Funil de Movimentação (Stacked Bar Chart)
const chartIndividual04 = () => {
  const theme = getThemeColors();
  
  const chartOptions = {
    series: [
      {
        name: "Entrada no Estoque",
        data: [120, 130, 125, 140, 135],
      },
      {
        name: "Em Processamento",
        data: [80, 90, 85, 95, 90],
      },
      {
        name: "Em Uso",
        data: [60, 70, 65, 75, 70],
      },
      {
        name: "Saída do Estoque",
        data: [40, 50, 45, 55, 50],
      },
    ],
    colors: ["#BFDBFE", "#93C5FD", "#60A5FA", "#3B82F6"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 280,
      type: "bar",
      stacked: true,
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
      categories: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
      labels: {
        style: {
          colors: theme.textColor,
          fontSize: "12px",
        },
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
    },
    legend: { show: false },
    tooltip: {
      theme: theme.tooltipTheme,
      y: {
        formatter: function (val) {
          return val + " unidades";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartIndividual04");
  if (chartSelector.length) {
    const chart = new ApexCharts(document.querySelector("#chartIndividual04"), chartOptions);
    chart.render();
    window.chartIndividual04Instance = chart;
  }
};

export default chartIndividual04;

