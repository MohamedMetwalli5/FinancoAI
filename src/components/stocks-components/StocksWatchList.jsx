import React, { useEffect, useState } from 'react';
import { FaCircleMinus, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import axios from 'axios';

const StockData = () => {

    const companies = [
        { symbol: "AAPL", name: "Apple Inc" },
        { symbol: "AMZN", name: "Amazon.com Inc" },
        { symbol: "GOOGL", name: "Alphabet Inc (Google)" },
        // { symbol: "MSFT", name: "Microsoft Corporation" },
        // { symbol: "META", name: "Meta Platforms Inc (Facebook)" },
        // { symbol: "NVDA", name: "NVIDIA Corporation" },
        // { symbol: "TSLA", name: "Tesla Inc" },
        // { symbol: "IBM", name: "International Business Machines" },
        // { symbol: "ORCL", name: "Oracle Corporation" },
        // { symbol: "AMD", name: "Advanced Micro Devices" },
        // { symbol: "UBER", name: "Uber Technologies Inc" },
        // { symbol: "PYPL", name: "PayPal Holdings Inc" },
      ];
      

  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    try {
      const response = await axios.get('https://api.twelvedata.com/quote', {
        params: {
          symbol: companies.map(company => company.symbol).toString(),  // The required stock symbols
          apikey: process.env.REACT_APP_TWELVE_DATA_API_KEY, // The API Key
        },
      });
      setStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Failed to fetch stock data');
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <div className='flex-1 bg-white rounded-lg p-2'>
      {/* In case of any errors */}
      {error && <p className='text-red-500'>{error}</p>}
      
      <div className='flex-col'>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-lg font-bold'>Watchlist</h1>
          <button className='bg-blue-100 rounded-lg p-2 text-gray-500 hover:bg-blue-200'>Add New</button>
        </div>

        {stockData ? (
          Object.keys(stockData).map((symbol) => {
            const stock = stockData[symbol];
            return (
              <div key={symbol} className='flex m-auto justify-between items-center border-y p-1'>
                <FaCircleMinus className='cursor-pointer text-red-500'/>
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
