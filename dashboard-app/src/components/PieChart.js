import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registering the required components
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data, labels }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'], 
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full h-64">
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default PieChart;
