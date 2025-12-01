import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartFifteen - Consumo Mensal do Produto (Bar Chart estilo Monthly Sales)
const chart15 = () => {
  const theme = getThemeColors();
  
  const chartFifteenOptions = {
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
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 6,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        style: {
          colors: theme.textColor,
          fontSize: "12px",
          fontWeight: 500,
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
      labels: {
        formatter: function (val) {
          return Math.floor(val).toLocaleString('pt-BR');
        },
        style: {
          colors: theme.textColor,
          fontSize: "11px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.gridColor,
      strokeDashArray: 3,
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
      theme: theme.tooltipTheme,
      y: {
        formatter: function (val) {
          return val.toLocaleString('pt-BR') + " unidades";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartFifteen");

  if (chartSelector.length) {
    const chartFifteen = new ApexCharts(
      document.querySelector("#chartFifteen"),
      chartFifteenOptions,
    );
    chartFifteen.render();
    window.chartFifteenInstance = chartFifteen;
  }
};

export default chart15;
