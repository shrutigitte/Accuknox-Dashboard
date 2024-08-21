import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarGraph({ data, labels }) {
  // Create a single dataset for the stacked bar chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Data', // Label for the dataset
        data: data,
        backgroundColor: [
          '#FF6384', // Color for the first data point
          '#FFCE56', // Color for the second data point
          '#36A2EB', // Color for the third data point
          '#4BC0C0', // Color for the fourth data point
          '#9966FF', // Additional colors if needed
          '#FF9F40',
          '#FF6384',
          '#4BC0C0',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const options = {
    indexAxis: 'y', // Makes the bar graph horizontal
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true, // Enable stacking for the x-axis
      },
      y: {
        stacked: true, // Enable stacking for the y-axis
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`; // Customize tooltip display
          },
        },
      },
    },
  };

  return (
    <div>
      <div className='flex justify-center items-center w-full h-64'>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default BarGraph;