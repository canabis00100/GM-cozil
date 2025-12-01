import ApexCharts from "apexcharts";

// ===== chartSix - Lead Time do Fornecedor (Line Chart)
const chart06 = () => {
  const chartSixOptions = {
    series: [
      {
        name: "Lead Time",
        data: [12, 15, 18, 14, 16, 13, 17, 15, 14, 16, 12, 15],
      },
    ],
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line",
      height: 280,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Dias",
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 3,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " dias";
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartSix");

  if (chartSelector.length) {
    const chartSix = new ApexCharts(
      document.querySelector("#chartSix"),
      chartSixOptions,
    );
    chartSix.render();
    window.chartSixInstance = chartSix;
  }
};

export default chart06;

