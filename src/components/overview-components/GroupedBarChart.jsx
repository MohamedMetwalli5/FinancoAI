import React from 'react';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; 

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

const GroupedBarChart = () => {
  const data = {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    datasets: [
      {
        label: 'Balance',
        data: [10, 20, 30],
        backgroundColor: 'rgba(137, 196, 244, 1)',
        borderColor: 'rgba(0, 0, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Income',
        data: [20, 30, 40],
        backgroundColor: 'rgba(225, 190, 255, 1)',
        borderColor: 'rgba(96, 0, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: [30, 40, 50],
        backgroundColor: 'rgba(144, 238, 144, 1)',
        borderColor: 'rgba(0, 128, 0, 1)',
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="my-8">
      <h2 className="text-center text-xl font-bold mb-4"></h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GroupedBarChart;
