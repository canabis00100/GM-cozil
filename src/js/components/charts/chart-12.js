import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartTwelve - Movimentação do Estoque (Entradas e Saídas) - Area Chart
const chart12 = () => {
  const theme = getThemeColors();
  
  const chartTwelveOptions = {
    series: [
      {
        name: "Entradas",
        data: [1200, 1500, 1100, 1400, 1300, 1600, 1400, 1500, 1300, 1400, 1200, 1500],
      },
      {
        name: "Saídas",
        data: [800, 900, 750, 850, 900, 950, 850, 900, 800, 850, 750, 900],
      },
    ],
    colors: ["#10B981", "#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 280,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      labels: {
        style: {
          colors: theme.textColor,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Unidades",
        style: {
          color: theme.textColor,
        },
      },
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
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: theme.legendColor,
      },
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

  const chartSelector = document.querySelectorAll("#chartTwelve");

  if (chartSelector.length) {
    const chartTwelve = new ApexCharts(
      document.querySelector("#chartTwelve"),
      chartTwelveOptions,
    );
    chartTwelve.render();
    window.chartTwelveInstance = chartTwelve;
  }
};

export default chart12;

