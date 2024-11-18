import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { BiBorderRadius } from "react-icons/bi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    
  // Defining the data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "",
        data: [30, 40, 20, 70, 90, 60],
        backgroundColor: "rgba(225, 190, 255, 1)",
        borderColor: "rgba(96, 0, 128, 1)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  // Defining the chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expected Income",
      },
    },
  };

  return (
    // <div className="w-full sm:w-96 h-72 mx-auto">
      <Bar data={data} options={options} />
    // </div>
  );
  
};

export default BarChart;
