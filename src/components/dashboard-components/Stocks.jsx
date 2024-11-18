import React from 'react'
import StocksChart from '../stocks-components/StocksChart'
import StocksWatchList from '../stocks-components/StocksWatchList'

const Stocks = () => {
  return (
    <div className='flex space-x-2 mt-5 bg-emerald-100'>
        <StocksChart/>
        <StocksWatchList/>
    </div>
  )
}

export default Stocks