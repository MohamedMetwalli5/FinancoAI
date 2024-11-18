import React from 'react'

const StocksWatchList = () => {
  return (
    <div className='flex-1 bg-slate-100 rounded-lg p-2 relative'>
        <div className='flix flex-col'>
            <h1 className='text-lg font-bold'>Watchlist</h1>

            <div className='flex m-auto justify-between items-center border-y p-1'>
                <div>
                    <h2 className='text-md font-bold'>ADS</h2>
                    <h4 className='text-sm'>ADS</h4>
                </div>
                <div>
                    <h2 className='text-md font-bold'>53,49$</h2>
                    <h4 className='text-sm text-green-500'>0.76%</h4>
                </div>
            </div>
            
            <div className='flex m-auto justify-between items-center border-y p-1'>
                <div>
                    <h2 className='text-md font-bold'>AAPL</h2>
                    <h4 className='text-sm'>AAPL</h4>
                </div>
                <div>
                    <h2 className='text-md font-bold'>193,36$</h2>
                    <h4 className='text-sm text-green-500'>0.76%</h4>
                </div>
            </div>

        </div>
    </div>
  )
}

export default StocksWatchList