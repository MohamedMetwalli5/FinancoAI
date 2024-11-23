import React from 'react';
import StocksChart from '../stocks-components/StocksChart';
import StocksWatchList from '../stocks-components/StocksWatchList';
import StockTips from '../stocks-components/StockTips';

const Stocks = ({email}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-5 bg-slate-50 rounded-lg">
      <div className="flex justify-center items-center shadow-lg border rounded-lg p-4 bg-white">
        <StocksChart email={email}/>
      </div>
      
      <div className="flex justify-center items-center shadow-lg border rounded-lg p-2 bg-white">
        <StocksWatchList email={email}/>
      </div>
      
      <div className="flex justify-center shadow-lg border rounded-lg">
        <StockTips email={email}/>
      </div>
    </div>
  );
};

export default Stocks;
