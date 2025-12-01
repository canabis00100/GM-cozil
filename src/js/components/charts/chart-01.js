import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartOne
const chart01 = () => {
  const theme = getThemeColors();
  
  const chartOneOptions = {
    series: [
      {
        name: "Consumo Mensal",
        data: [1680, 3850, 2010, 2980, 1870, 1950, 2910, 1100, 2150, 3900, 2800, 1120],
      },
    ],
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: window.innerWidth < 640 ? 200 : 280,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: window.innerWidth < 640 
        ? ["Jan", "Mar", "Mai", "Jul", "Set", "Nov"] // Mobile: 6 meses
        : ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], // Desktop: 12 meses
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
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",

      markers: {
        radius: 99,
      },
    },
    yaxis: {
      title: {
        text: "Unidades Consumidas",
        style: {
          fontSize: "12px",
          fontWeight: 600,
          color: theme.textColor,
        },
      },
      labels: {
        formatter: function (val) {
          return Math.floor(val).toLocaleString('pt-BR');
        },
        style: {
          colors: theme.textColor,
        },
      },
    },
    grid: {
      borderColor: theme.gridColor,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      theme: theme.tooltipTheme,
      x: {
        show: true,
      },
      y: {
        formatter: function (val) {
          return val.toLocaleString('pt-BR') + " unidades";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartOne");

  if (chartSelector.length) {
    const chartFour = new ApexCharts(
      document.querySelector("#chartOne"),
      chartOneOptions,
    );
    chartFour.render();
    window.chartOneInstance = chartFour; // Exporta instância para atualização
  }
};

export default chart01;
