import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartThirteen - Ranking de Fornecedores (Gráfico de Barras Verticais Moderno com Gradiente)
const chart13 = () => {
  const theme = getThemeColors();
  
  const chartThirteenOptions = {
    series: [
      {
        name: "Taxa de Pontualidade",
        data: [95.5, 92.1, 88.2, 76.8],
      },
    ],
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 320,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
      dropShadow: {
        enabled: true,
        color: "#465fff",
        top: 0,
        left: 0,
        blur: 10,
        opacity: 0.3,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 8,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "top",
        },
        distributed: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + "%";
      },
      offsetY: -25,
      style: {
        fontSize: "13px",
        fontWeight: 700,
        colors: ["#465fff"],
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.45,
      },
    },
    xaxis: {
      categories: ["Fornecedor A", "Fornecedor C", "Fornecedor B", "Fornecedor D"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 600,
          colors: theme.textColor,
        },
      },
    },
    yaxis: {
      title: {
        text: "Taxa de Pontualidade (%)",
        style: {
          fontSize: "13px",
          fontWeight: 700,
          color: theme.textColor,
        },
      },
      max: 100,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        formatter: function (val) {
          return val + "%";
        },
        style: {
          fontSize: "12px",
          fontWeight: 600,
          colors: theme.textColor,
        },
      },
    },
    grid: {
      borderColor: theme.gridColor,
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    tooltip: {
      enabled: true,
      theme: theme.tooltipTheme,
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val, { dataPointIndex, w }) {
          const fornecedor = w.globals.categoryLabels[dataPointIndex];
          return fornecedor + ": " + val.toFixed(1) + "% de pontualidade";
        },
      },
      marker: {
        show: true,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#7C3AED"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.15,
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartThirteen");

  if (chartSelector.length) {
    const chartThirteen = new ApexCharts(
      document.querySelector("#chartThirteen"),
      chartThirteenOptions,
    );
    chartThirteen.render();
    window.chartThirteenInstance = chartThirteen;
  }
};

export default chart13;
