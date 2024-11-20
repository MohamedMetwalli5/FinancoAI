import React from 'react';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; 
import { useEffect, useState } from "react";
import axios from 'axios'; 

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

const GroupedBarChart = () => {

  const LastThreeMonthsAbbreviations = []
  const MonthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  for(let i = 0; i < 3; i++) {
    const MonthIndex = (now.getMonth()-i+12) % 12;
    LastThreeMonthsAbbreviations.unshift(MonthAbbreviations[MonthIndex]);
  }

  const [ChartData, setChartData] = useState([])

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transactions");
      // console.log("The Fetched Transactions:", response.data);
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [])
  
  const categories = ["Balance", "Income", "Expenses"];

  
  const data = {
    labels: [LastThreeMonthsAbbreviations[0], LastThreeMonthsAbbreviations[1], LastThreeMonthsAbbreviations[2]],
    datasets: [
      {
        label: 'Balance',
        data: categories.map((category) =>
          ChartData.filter((t) => t.category === category)
                   .reduce((sum, t) => sum + Number(t.amount), 0)
        ),
        backgroundColor: 'rgba(137, 196, 244, 1)',
        borderColor: 'rgba(0, 0, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Income',
        data: categories.map((category) =>
               ChartData.filter((t) => t.category === category)
                        .reduce((sum, t) => sum + Number(t.amount), 0)
        ),
        backgroundColor: 'rgba(225, 190, 255, 1)',
        borderColor: 'rgba(96, 0, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: categories.map((category) =>
               ChartData.filter((t) => t.category === category)
                        .reduce((sum, t) => sum + Number(t.amount), 0)
        ),
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
