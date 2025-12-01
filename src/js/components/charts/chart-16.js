import ApexCharts from "apexcharts";
import { getThemeColors } from "../../utils/themeUtils";

// ===== chartSixteen - Duração Estimada do Estoque (Gauge Chart estilo Monthly Target)
const chart16 = () => {
  const theme = getThemeColors();
  
  const chartSixteenOptions = {
    series: [75.55],
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 280,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: theme.isDark ? "#374151" : "#E5E7EB",
          strokeWidth: "97%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -10,
            fontSize: "32px",
            fontWeight: 700,
            color: theme.textColor,
            formatter: function (val) {
              return val.toFixed(1) + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: [""],
  };

  const chartSelector = document.querySelectorAll("#chartSixteen");

  if (chartSelector.length) {
    const chartSixteen = new ApexCharts(
      document.querySelector("#chartSixteen"),
      chartSixteenOptions,
    );
    chartSixteen.render();
    window.chartSixteenInstance = chartSixteen;
  }
};

export default chart16;
