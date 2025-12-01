import ApexCharts from "apexcharts";

// ===== chartSeven - Atrasos por Fornecedor (Bar Chart)
const chart07 = () => {
  const chartSevenOptions = {
    series: [
      {
        name: "Atrasos",
        data: [8, 15, 3, 2],
      },
    ],
    colors: ["#EF4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 280,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "60%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetX: 10,
      style: {
        fontSize: "12px",
        colors: ["#6B7280"],
      },
    },
    xaxis: {
      title: {
        text: "Número de Atrasos",
      },
    },
    yaxis: {
      categories: ["Fornecedor A", "Fornecedor B", "Fornecedor C", "Fornecedor D"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 3,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " atrasos";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartSeven");

  if (chartSelector.length) {
    const chartSeven = new ApexCharts(
      document.querySelector("#chartSeven"),
      chartSevenOptions,
    );
    chartSeven.render();
    window.chartSevenInstance = chartSeven;
  }
};

export default chart07;

