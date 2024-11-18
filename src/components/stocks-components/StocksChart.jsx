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
  // Updated data with consistent length
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Stock A",
        data: [150, 200, 180, 220, 250, 230, 260, 270, 280],
        borderColor: "rgba(46, 204, 113, 1)",
        backgroundColor: "rgba(46, 204, 113, 0.2)",
        pointBackgroundColor: "rgba(46, 204, 113, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Stock B",
        data: [230, 210, 220, 250, 240, 260, 280, 290, 300],
        borderColor: "rgba(231, 76, 60, 1)",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        pointBackgroundColor: "rgba(231, 76, 60, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          size: 18,
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
          stepSize: 50,
        },
        grid: {
          color: "#eeeeee",
        },
        min: 100,
        max: 350,
      },
    },
  };

  return (
    <div className="w-full h-96 mx-auto bg-white p-4 rounded-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default StocksChart;
