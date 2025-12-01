import ApexCharts from "apexcharts";

// ===== chartFourteen - Atrasos do Fornecedor por Mês (Bar Chart Vertical Moderno)
const chart14 = () => {
  const chartFourteenOptions = {
    series: [
      {
        name: "Quantidade de Atrasos",
        data: [0, 5, 3, 0, 2, 0, 1, 0, 0, 0, 0, 0],
      },
    ],
    colors: ["#EF4444"],
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
        color: "#EF4444",
        top: 0,
        left: 0,
        blur: 10,
        opacity: 0.3,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
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
        return val > 0 ? val : "";
      },
      offsetY: -25,
      style: {
        fontSize: "13px",
        fontWeight: 700,
        colors: ["#EF4444"],
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
      categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
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
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      title: {
        text: "Quantidade de Atrasos",
        style: {
          fontSize: "13px",
          fontWeight: 700,
          color: "#6B7280",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 600,
        },
        formatter: function (val) {
          return Math.floor(val);
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      borderColor: "#E5E7EB",
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
      theme: "dark",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return val + (val === 1 ? " atraso registrado" : " atrasos registrados");
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
        gradientToColors: ["#DC2626"],
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

  const chartSelector = document.querySelectorAll("#chartFourteen");

  if (chartSelector.length) {
    const chartFourteen = new ApexCharts(
      document.querySelector("#chartFourteen"),
      chartFourteenOptions,
    );
    chartFourteen.render();
    window.chartFourteenInstance = chartFourteen;
  }
};

export default chart14;
