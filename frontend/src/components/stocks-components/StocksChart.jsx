import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { AppContext } from '../../AppContext.jsx';
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
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const { sharedUserEmail } = useContext(AppContext);

  const [currentSubscriptions, setCurrentSubscriptions] = useState(["AAPL, AMZN, GOOGL"]);

  const token = localStorage.getItem("authToken");

  const fetchSubscribedStocks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/subscribed-stocks/${sharedUserEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("fdsfsdfsdfdsf", response.data);
      setCurrentSubscriptions(response.data.subscribedstocks);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };


  useEffect(() => {
    fetchSubscribedStocks();
  }, [])
  
  // I used mock data here for demonstration purposes; the same approach can be applied to live data in the stocks watchlist.
  const mockStockData = [
    {
      symbol: "AAPL",
      data: [
        { datetime: "2024-11-20 10:00:00", open: 316.00, high: 320.00, low: 315.00, close: 318.00, volume: 450000 },
        { datetime: "2024-11-20 10:01:00", open: 318.00, high: 321.00, low: 317.00, close: 319.50, volume: 420000 },
        { datetime: "2024-11-20 10:02:00", open: 319.00, high: 322.00, low: 318.00, close: 318.50, volume: 380000 },
        { datetime: "2024-11-20 10:03:00", open: 318.50, high: 320.50, low: 317.50, close: 318.75, volume: 500000 },
        { datetime: "2024-11-20 10:04:00", open: 318.80, high: 319.80, low: 317.80, close: 318.00, volume: 510000 }
      ]
    },
    {
      symbol: "AMZN",
      data: [
        { datetime: "2024-11-20 10:00:00", open: 216.00, high: 219.00, low: 215.00, close: 218.00, volume: 120000 },
        { datetime: "2024-11-20 10:01:00", open: 218.00, high: 220.00, low: 217.00, close: 219.00, volume: 125000 },
        { datetime: "2024-11-20 10:02:00", open: 219.00, high: 221.00, low: 218.00, close: 218.50, volume: 115000 },
        { datetime: "2024-11-20 10:03:00", open: 218.50, high: 220.50, low: 218.00, close: 218.25, volume: 130000 },
        { datetime: "2024-11-20 10:04:00", open: 218.30, high: 219.30, low: 217.30, close: 218.10, volume: 140000 }
      ]
    },
    {
      symbol: "GOOGL",
      data: [
        { datetime: "2024-11-20 10:00:00", open: 190.00, high: 195.00, low: 189.00, close: 193.00, volume: 120000 },
        { datetime: "2024-11-20 10:01:00", open: 193.00, high: 195.50, low: 192.00, close: 194.00, volume: 125000 },
        { datetime: "2024-11-20 10:02:00", open: 194.00, high: 196.00, low: 192.50, close: 194.50, volume: 115000 },
        { datetime: "2024-11-20 10:03:00", open: 194.50, high: 196.50, low: 193.00, close: 193.50, volume: 130000 },
        { datetime: "2024-11-20 10:04:00", open: 193.50, high: 195.00, low: 193.00, close: 193.00, volume: 140000 }
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
    datasets: mockStockData.filter(stock => currentSubscriptions.includes(stock.symbol)).map(stock => {
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
