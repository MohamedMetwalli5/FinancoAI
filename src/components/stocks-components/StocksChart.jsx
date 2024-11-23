import React, { useEffect, useState } from "react";
import axios from "axios";
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
  
  const email = "mohamedmetwalli5@gmail.com"

  const [currentSubscriptions, setCurrentSubscriptions] = useState([]);

  const fetchStockData = async () => {
    if (!email) {
      console.error("Email is undefined.");
      return;
    }
    const {data} = await axios.get(`http://localhost:5000/subscribed-stocks/${email}`);
    const currentSubscriptions = data.subscribedstocks;
    setCurrentSubscriptions(currentSubscriptions);
  }

  useEffect(() => {
    fetchStockData();
  }, [])
  
  const mockStockData = [
    {
      symbol: "AAPL",
      data: [
        { datetime: "2024-11-20 10:00:00", open: 150.75, high: 152.30, low: 150.10, close: 121.80, volume: 450000 },
        { datetime: "2024-11-20 10:01:00", open: 151.80, high: 152.00, low: 150.90, close: 141.30, volume: 420000 },
        { datetime: "2024-11-20 10:02:00", open: 151.30, high: 151.90, low: 150.50, close: 251.60, volume: 380000 },
        { datetime: "2024-11-20 10:03:00", open: 151.60, high: 152.50, low: 151.10, close: 152.20, volume: 500000 },
        { datetime: "2024-11-20 10:04:00", open: 152.20, high: 152.80, low: 151.70, close: 100.40, volume: 510000 }
      ]
    },
    {
      symbol: "GOOGL",
      data: [
        { datetime: "2024-11-20 10:00:00", open: 2800.00, high: 2805.00, low: 2790.00, close: 202.50, volume: 120000 },
        { datetime: "2024-11-20 10:01:00", open: 2802.50, high: 2810.00, low: 2800.00, close: 107.00, volume: 125000 },
        { datetime: "2024-11-20 10:02:00", open: 2807.00, high: 2812.00, low: 2805.00, close: 150.50, volume: 115000 },
        { datetime: "2024-11-20 10:03:00", open: 2809.50, high: 2815.00, low: 2808.00, close: 105.00, volume: 130000 },
        { datetime: "2024-11-20 10:04:00", open: 2812.00, high: 2816.00, low: 2810.00, close: 140.50, volume: 140000 }
      ]
    }
  ];
  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: mockStockData.map(stock => {
      const color = getRandomColor();
      return{
        label: stock.symbol || "",
        data: stock.data.map(d => d.close),
        borderColor: color,
        backgroundColor: color,
        pointBackgroundColor: color,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      };
    }),
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
