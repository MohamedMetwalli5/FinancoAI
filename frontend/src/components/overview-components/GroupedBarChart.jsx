import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios'; 

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

const GroupedBarChart = ({email}) => {
  const MonthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const [ChartData, setChartData] = useState([]);
  const [last3MonthsSum, setLast3MonthsSum] = useState([]);


  const token = localStorage.getItem('authToken'); // Retrieving the token to be used below

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/transactions/${email}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  
  useEffect(() => {
    if (ChartData.length === 0) return;

    const categories = ["Balance", "Income", "Expenses"];
    const monthlySums = categories.map(() => [0, 0, 0]); // Initialize array for each category

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Looping through each category and calculate sums
    categories.forEach((category, categoryIndex) => {
      for(let monthOffset = 0; monthOffset < 3; monthOffset++) {
        const targetMonth = (currentMonth - monthOffset + 12) % 12;
        const targetYear = (currentMonth - monthOffset < 0) ? currentYear - 1 : currentYear;

        // Filtering and suming amounts
        const sumForMonth = ChartData.filter(item => {
          const itemDate = new Date(item.date);
          return item.category === category &&
                 itemDate.getMonth() === targetMonth &&
                 itemDate.getFullYear() === targetYear;
        }).reduce((sum, item) => sum + Number(item.amount), 0);

        monthlySums[categoryIndex][monthOffset] = sumForMonth;
      }
    });

    setLast3MonthsSum(monthlySums);
  }, [ChartData]);

  const LastThreeMonthsAbbreviations = [...Array(3)].map((_, i) => {
    const targetMonth = (new Date().getMonth() - i + 12) % 12;
    return MonthAbbreviations[targetMonth];
  }).reverse(); // Reversing to get the correct order

  const data = {
    labels: LastThreeMonthsAbbreviations,
    datasets: [
      {
        label: 'Balance',
        data: last3MonthsSum[0]?.slice().reverse() || [], // Ensuring default empty array if sums aren't calculated yet
        backgroundColor: 'rgba(137, 196, 244, 1)',
        borderColor: 'rgba(0, 0, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Income',
        data: last3MonthsSum[1]?.slice().reverse() || [],
        backgroundColor: 'rgba(225, 190, 255, 1)',
        borderColor: 'rgba(96, 0, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: last3MonthsSum[2]?.slice().reverse() || [],
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default GroupedBarChart;