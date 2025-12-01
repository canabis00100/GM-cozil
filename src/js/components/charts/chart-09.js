import ApexCharts from "apexcharts";

// ===== chartNine - Itens Próximos do Ponto de Pedido (Horizontal Bar Chart)
const chart09 = () => {
  const chartNineOptions = {
    series: [
      {
        name: "Disponível",
        data: [270, 55, 225, 320, 930],
      },
      {
        name: "Ponto de Pedido",
        data: [300, 100, 200, 400, 500],
      },
    ],
    colors: ["#EF4444", "#F59E0B"],
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
      enabled: false,
    },
    xaxis: {
      categories: ["PCM-002", "PCM-003", "PCM-004", "PCM-005", "PCM-001"],
    },
    yaxis: {
      title: {
        text: "Produtos",
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 3,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " unidades";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartNine");

  if (chartSelector.length) {
    const chartNine = new ApexCharts(
      document.querySelector("#chartNine"),
      chartNineOptions,
    );
    chartNine.render();
    window.chartNineInstance = chartNine;
  }
};

export default chart09;

