import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartEleven - Curva de Consumo dos últimos 12 meses (Line Chart)
const chart11 = () => {
  const theme = getThemeColors();
  
  const chartElevenOptions = {
    series: [
      {
        name: "Consumo",
        data: [800, 600, 900, 750, 850, 700, 950, 820, 880, 720, 900, 850],
      },
    ],
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line",
      height: 280,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 2, 2],
    },
    markers: {
      size: [4, 0, 0],
      hover: {
        size: [6, 0, 0],
      },
    },
    annotations: {
      points: [
        {
          x: "Feb",
          y: 600,
          marker: {
            size: 6,
            fillColor: "#EF4444",
            strokeColor: "#fff",
            strokeWidth: 2,
          },
          label: {
            text: "Menor",
            style: {
              color: "#EF4444",
              fontSize: "12px",
            },
          },
        },
        {
          x: "Jul",
          y: 950,
          marker: {
            size: 6,
            fillColor: "#10B981",
            strokeColor: "#fff",
            strokeWidth: 2,
          },
          label: {
            text: "Maior",
            style: {
              color: "#10B981",
              fontSize: "12px",
            },
          },
        },
      ],
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
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
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
    legend: {
      labels: {
        colors: theme.legendColor,
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartEleven");

  if (chartSelector.length) {
    const chartEleven = new ApexCharts(
      document.querySelector("#chartEleven"),
      chartElevenOptions,
    );
    chartEleven.render();
    window.chartElevenInstance = chartEleven;
  }
};

export default chart11;

