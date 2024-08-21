import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ data, labels = [] }) {
  const colors = ['#4CAF50', '#FF6384', '#DFFF00', '#FF7F50', '#36A2EB', '#FFCE56'];

  // Dynamically select only the necessary colors and labels based on data length
  const chartData = {
    labels: labels.slice(0, data.length),
    datasets: [
      {
        data: data,
        backgroundColor: colors.slice(0, data.length),
      },
    ],
  };

  return (
    
    <div className="flex justify-center items-center w-full h-64">

      <Doughnut data={chartData} />
    </div>
    
  );
}

export default DonutChart;
