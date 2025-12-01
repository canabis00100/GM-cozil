import ApexCharts from "apexcharts";

// ===== chartFour - Top Produtos Mais Consumidos
const chart04 = () => {
  const chartFourOptions = {
    series: [
      {
        name: "Consumo",
        data: [1250, 980, 850, 720, 650, 580, 520, 480, 420, 380],
      },
    ],
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
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
      categories: ["PCM-001", "PCM-002", "PCM-003", "PCM-004", "PCM-005", "PCM-006", "PCM-007", "PCM-008", "PCM-009", "PCM-010"],
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
      title: false,
    },
    grid: {
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
      x: {
        show: false,
      },
      y: {
        formatter: function (val) {
          return val + " unidades";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartFour");

  if (chartSelector.length) {
    const chartFour = new ApexCharts(
      document.querySelector("#chartFour"),
      chartFourOptions,
    );
    chartFour.render();
    window.chartFourInstance = chartFour;
  }
};

export default chart04;

