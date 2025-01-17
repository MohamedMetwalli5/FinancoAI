import React, { useEffect, useState, useContext } from 'react';
import { FaCircleMinus, FaCirclePlus, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import axios from 'axios';
import { AppContext } from '../../AppContext.jsx';



const StockData = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const { sharedUserEmail } = useContext(AppContext);
    
  const mockStockData = {
    AAPL: { symbol: "AAPL", price: "", percent_change: "-0.16097", name: "Apple Inc" },
    AMZN: { symbol: "AMZN", price: "", percent_change: "0.23015", name: "Amazon.com Inc" },
    GOOGL: { symbol: "GOOGL", price: "", percent_change: "1.5623", name: "Alphabet Inc (Google)" },
  };

  const companies = [
    { symbol: "AAPL", name: "Apple Inc" },
    { symbol: "AMZN", name: "Amazon.com Inc" },
    { symbol: "GOOGL", name: "Alphabet Inc (Google)" },
    // { symbol: "MSFT", name: "Microsoft Corporation" },
    // { symbol: "META", name: "Meta Platforms Inc (Facebook)" },
    // { symbol: "IBM", name: "International Business Machines" },
    // { symbol: "NVDA", name: "NVIDIA Corporation" },
    // { symbol: "TSLA", name: "Tesla Inc" },
    // { symbol: "ORCL", name: "Oracle Corporation" },
    // { symbol: "AMD", name: "Advanced Micro Devices" },
    // { symbol: "UBER", name: "Uber Technologies Inc" },
    // { symbol: "PYPL", name: "PayPal Holdings Inc" },
  ];

  const [subscribedStocks, setSubscribedStocks] = useState([]);
  const [stockData, setStockData] = useState(mockStockData);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');

  // Fetching the live stock data
  const fetchStockData = async () => {
    try {
      const response = await axios.get('https://api.twelvedata.com/quote', {
        params: {
          symbol: companies.map(company => company.symbol).toString(),
          apikey: import.meta.env.VITE_TWELVE_DATA_API_KEY,
        },
      });
      setStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Failed to fetch stock data');
    }
  };

  // Fetching already user subscriptions
  const fetchSubscribedStocks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/subscribed-stocks/${sharedUserEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("fdsfsdfsdfdsf", response.data);
      setSubscribedStocks(response.data.subscribedstocks || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };
  

  
  useEffect(() => {
    fetchStockData();
    fetchSubscribedStocks();
  }, []);


  const addSubscription = async (newSymbol) => {
    try {
      if (!sharedUserEmail) {
        console.error("Email is undefined. Cannot update subscriptions.");
        return;
      }
      // Fetching the current subscriptions from the backend
      const { data } = await axios.get(`${backendUrl}/subscribed-stocks/${sharedUserEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const currentSubscriptions = data.subscribedstocks || [];

      const updatedSubscriptions = [...new Set([...currentSubscriptions, newSymbol])]; // Merging current subscriptions with the new symbol

      // Sending the updated list back to the server
      const response = await axios.put(
        `${backendUrl}/subscribed-stocks/${sharedUserEmail}`,
        { subscribedstocks: updatedSubscriptions }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setSubscribedStocks(updatedSubscriptions);
      console.log("User subscriptions saved:", response.data);
    } catch (error) {
      console.error("Error updating user info:", error.response ? error.response.data : error.message);
      alert("Failed to update user subscriptions.");
    }
  };


  const removeSubscription = async (symbolToRemove) => {
    try {
      const { data } = await axios.get(`${backendUrl}/subscribed-stocks/${sharedUserEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const currentSubscriptions = data.subscribedstocks || [];
      const updatedSubscriptions = currentSubscriptions.filter((item) => item !== symbolToRemove);

      await axios.put(`${backendUrl}/subscribed-stocks/${sharedUserEmail}`, 
        { subscribedstocks: updatedSubscriptions }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscribedStocks(updatedSubscriptions);
      console.log(`Unsubscribed from ${symbolToRemove}`);
    } catch (error) {
      console.error("Error removing subscription:", error);
    }
  };
  

  return (
    <div className='flex-1 bg-white rounded-lg p-2'>
      {error && <p className='text-red-500'>{error}</p>}

      <div className='flex-col'>
        <div className='flex justify-center items-center mb-5'>
          <h1 className='text-lg font-bold'>Watchlist</h1>
        </div>

        {stockData ? (
          Object.keys(stockData).map((symbol) => {
            const stock = stockData[symbol];
            const userSubscribed = subscribedStocks.includes(stock.symbol);

            return (
              <div key={symbol} className='flex m-auto justify-between items-center border-y p-1'>
                {userSubscribed ? (
                  <FaCircleMinus onClick={() => {
                    setSubscribedStocks(subscribedStocks.filter(item => item !== stock.symbol));
                    removeSubscription(stock.symbol);
                  }} className='cursor-pointer text-red-500' />
                ) : (
                  <FaCirclePlus onClick={() => {
                    setSubscribedStocks(prevState => [...prevState, stock.symbol]);
                    addSubscription(stock.symbol);
                  }} className='cursor-pointer text-blue-500' />
                )}
                <div className='text-center'>
                  <h2 className='text-md font-bold'>{stock.symbol}</h2>
                  <h4 className='text-sm'>{companies.find(company => company.symbol === symbol)?.name}</h4>
                </div>
                <div>
                  <h2 className='text-md font-bold'>{stock.price} USD</h2>
                  <div className={`flex ${stock.percent_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.percent_change >= 0 ? <FaArrowUp className='mr-1' /> : <FaArrowDown className='mr-1' />}
                    <h4 className='text-sm'>{stock.percent_change} %</h4>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading stock data...</p>
        )}
      </div>
    </div>
  );
};

export default StockData;
