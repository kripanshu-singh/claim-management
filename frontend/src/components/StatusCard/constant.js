export const statusChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio
    scales: {
      x: {
        display: false,
        categoryPercentage: 1,
        barPercentage: 2,
        stacked: true,
        min: 0,
        max: 98,
      },
      y: {
        display: false,
        categoryPercentage: 1,
        barPercentage: 1,
        stacked: true,
      },
    },
  
    plugins: {
      datalabels: {
        display: false,
      },
      legend: { display: false },
      tooltip: { enabled: false },
    },
    datasets: {
      bar: {
        borderWidth: 1,
        hoverBorderColor: '#fff',
        borderColor: '#fff',
        barPercentage: 1.3,
        borderSkipped: false,
        borderRadius: [{
          topLeft: 3,
          topRight: 3,
          bottomLeft: 3,
          bottomRight: 3,
        }],
      },
    },
  };