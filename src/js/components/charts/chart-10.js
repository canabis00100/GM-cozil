import ApexCharts from "apexcharts";

// ===== chartTen - KPI Gauge - Duração Estimada do Estoque
const chart10 = () => {
  const chartTenOptions = {
    series: [45],
    colors: ["#10B981"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 280,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "70%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: 600,
            offsetY: -10,
            color: "#6B7280",
          },
          value: {
            show: true,
            fontSize: "32px",
            fontWeight: 700,
            offsetY: 10,
            color: "#1D2939",
            formatter: function (val) {
              return val + " dias";
            },
          },
        },
      },
    },
    labels: ["Duração Estimada"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#059669"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartTen");

  if (chartSelector.length) {
    const chartTen = new ApexCharts(
      document.querySelector("#chartTen"),
      chartTenOptions,
    );
    chartTen.render();
    window.chartTenInstance = chartTen;
  }
};

export default chart10;

