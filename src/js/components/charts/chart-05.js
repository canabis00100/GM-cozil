import ApexCharts from "apexcharts";

// ===== chartFive - Tendência de Estoque Total
const chart05 = () => {
  const chartFiveOptions = {
    series: [
      {
        name: "Estoque Total",
        data: [12500, 12800, 13200, 12900, 13100, 13400, 13000, 13300, 13500, 13200, 13000, 12800],
      },
      {
        name: "Estoque Disponível",
        data: [9800, 10100, 10500, 10200, 10400, 10700, 10300, 10600, 10800, 10500, 10300, 10100],
      },
    ],
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    stroke: {
      curve: "straight",
      width: ["2", "2"],
    },
    markers: {
      size: 0,
    },
    labels: {
      show: false,
      position: "top",
    },
    grid: {
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
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: false,
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartFive");

  if (chartSelector.length) {
    const chartFive = new ApexCharts(
      document.querySelector("#chartFive"),
      chartFiveOptions,
    );
    chartFive.render();
    window.chartFiveInstance = chartFive;
  }
};

export default chart05;

