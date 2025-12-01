import ApexCharts from "apexcharts";

// Função para detectar tema dark/light
function getThemeColors() {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    isDark,
    textColor: isDark ? '#E5E7EB' : '#6B7280',
    gridColor: isDark ? '#374151' : '#E5E7EB',
    tooltipTheme: isDark ? 'dark' : 'light',
    legendColor: isDark ? '#D1D5DB' : '#374151',
  };
}

// ===== chartThree
const chart03 = () => {
  const theme = getThemeColors();
  
  const chartThreeOptions = {
    series: [
      {
        name: "Compras",
        data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
      },
      {
        name: "Consumo",
        data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
      },
    ],
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "13px",
      fontWeight: 600,
      labels: {
        colors: theme.legendColor,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5,
      },
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: window.innerWidth < 640 ? 220 : 310,
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
      borderColor: theme.gridColor,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
          strokeDashArray: 4,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: theme.tooltipTheme,
      style: {
        fontSize: '13px',
      },
      y: {
        formatter: function (val, { seriesIndex, w }) {
          const seriesName = w.globals.seriesNames[seriesIndex];
          const formattedValue = val.toLocaleString('pt-BR', { 
            minimumFractionDigits: 0, 
            maximumFractionDigits: 0 
          });
          return seriesName + ": R$ " + formattedValue;
        },
      },
      x: {
        formatter: function (val) {
          return "Mês: " + val;
        },
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: theme.textColor,
        },
      },
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
        text: "Valor (R$)",
        style: {
          fontSize: "13px",
          fontWeight: 600,
          color: theme.textColor,
        },
      },
      labels: {
        formatter: function (val) {
          return "R$ " + Math.floor(val).toLocaleString('pt-BR');
        },
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: theme.textColor,
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartThree");

  if (chartSelector.length) {
    const chartThree = new ApexCharts(
      document.querySelector("#chartThree"),
      chartThreeOptions,
    );
    chartThree.render();
    window.chartThreeInstance = chartThree; // Exporta instância para atualização
  }
};

export default chart03;
