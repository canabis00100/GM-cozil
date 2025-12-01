import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartEight - Distribuição do Estoque por Categoria (Donut Chart)
const chart08 = () => {
  const theme = getThemeColors();
  
  const chartEightOptions = {
    series: [35, 25, 20, 15, 5],
    colors: ["#465FFF", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 280,
    },
    labels: ["Fixadores", "Matéria Prima", "Químicos", "Componentes", "Soldagem"],
    legend: {
      position: "bottom",
      fontFamily: "Outfit",
      labels: {
        colors: theme.legendColor,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + "%";
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    tooltip: {
      theme: theme.tooltipTheme,
      y: {
        formatter: function (val, opts) {
          if (opts && opts.w && opts.w.globals && opts.w.globals.labels) {
            const label = opts.w.globals.labels[opts.seriesIndex] || "";
            return label + ": " + val.toFixed(1) + "%";
          }
          return val.toFixed(1) + "%";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartEight");

  if (chartSelector.length) {
    const chartEight = new ApexCharts(
      document.querySelector("#chartEight"),
      chartEightOptions,
    );
    chartEight.render();
    window.chartEightInstance = chartEight;
  }
};

export default chart08;

