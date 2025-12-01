// Utilitários para detecção e adaptação de tema (dark/light)

export function getThemeColors() {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    isDark,
    textColor: isDark ? '#E5E7EB' : '#6B7280',
    gridColor: isDark ? '#374151' : '#E5E7EB',
    tooltipTheme: isDark ? 'dark' : 'light',
    legendColor: isDark ? '#D1D5DB' : '#374151',
    axisColor: isDark ? '#9CA3AF' : '#6B7280',
  };
}

export function updateChartTheme(chartInstance) {
  if (!chartInstance) return;
  
  const theme = getThemeColors();
  
  chartInstance.updateOptions({
    xaxis: {
      labels: {
        style: {
          colors: theme.textColor,
        },
      },
    },
    yaxis: {
      title: {
        style: {
          color: theme.textColor,
        },
      },
      labels: {
        style: {
          colors: theme.textColor,
        },
      },
    },
    grid: {
      borderColor: theme.gridColor,
    },
    tooltip: {
      theme: theme.tooltipTheme,
    },
    legend: {
      labels: {
        colors: theme.legendColor,
      },
    },
  });
}

