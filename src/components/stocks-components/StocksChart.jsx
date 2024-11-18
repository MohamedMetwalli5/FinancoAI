import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const StocksChart = () => {
  // Data mimicking stock prices
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock A",
        data: [150, 200, 180, 220, 250, 230],
        borderColor: "rgba(46, 204, 113, 1)",
        backgroundColor: "rgba(46, 204, 113, 0.2)",
        pointBackgroundColor: "rgba(46, 204, 113, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Stock B",
        data: [250, 240, 260, 280, 290, 300],
        borderColor: "rgba(231, 76, 60, 1)",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        pointBackgroundColor: "rgba(231, 76, 60, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart options for a light theme
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333333",
        },
      },
      title: {
        display: true,
        text: "Your Stocks Performance",
        color: "#333333",
        font: {
          size: 16,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333333",
        bodyColor: "#333333",
        borderColor: "#dddddd",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333333",
        },
        grid: {
          color: "#eeeeee",
        },
      },
      y: {
        ticks: {
          color: "#333333",
        },
        grid: {
          color: "#eeeeee",
        },
      },
    },
  };

  return (
    <div className="flex-1 w-full sm:w-96 h-72 mx-auto bg-white p-4 rounded-lg shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default StocksChart;
