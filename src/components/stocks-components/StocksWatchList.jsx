import React from 'react'
import { FaCircleMinus, FaArrowUp } from "react-icons/fa6";

const StocksWatchList = () => {
  return (
    <div className='flex-1 bg-white rounded-lg p-2'>
        <div className='flex-col'>
            <div className='flex justify-between items-center mb-5'>
                <h1 className='text-lg font-bold'>Watchlist</h1>
                <button className='bg-blue-100 rounded-lg p-2 text-gray-500 hover:bg-blue-200'>Add New</button>
            </div>
            <div className='flex m-auto justify-between items-center border-y p-1'>
                <FaCircleMinus className='cursor-pointer text-red-500'/>
                <div className='text-center'>
                    <h2 className='text-md font-bold'>ADS</h2>
                    <h4 className='text-sm'>Adidas AG</h4>
                </div>
                <div>
                    <h2 className='text-md font-bold'>53,49$</h2>
                    <div className='flex text-green-500'>
                        <FaArrowUp className='mr-1'/>
                        <h4 className='text-sm'>0.76%</h4>
                    </div>
                </div>
            </div>
            
            <div className='flex m-auto justify-between items-center border-y p-1'>
                <FaCircleMinus className='cursor-pointer text-red-500'/>
                <div className='text-center'>
                    <h2 className='text-md font-bold'>AAPL</h2>
                    <h4 className='text-sm'>Apple Inc</h4>
                </div>
                <div>
                    <h2 className='text-md font-bold'>193,36$</h2>
                    <div className='flex text-green-500'>
                        <FaArrowUp className='mr-1'/>
                        <h4 className='text-sm'>0.76%</h4>
                    </div>
                </div>
            </div>

            <div className='flex m-auto justify-between items-center border-y p-1'>
                <FaCircleMinus className='cursor-pointer text-red-500'/>
                <div className='text-center'>
                    <h2 className='text-md font-bold'>NYSE</h2>
                    <h4 className='text-sm'>Nike Inc</h4>
                </div>
                <div>
                    <h2 className='text-md font-bold'>108,49$</h2>
                    <div className='flex text-red-500'>
                        <FaArrowUp className=' mr-1'/>
                        <h4 className='text-sm'>11.83%</h4>
                    </div>
                </div>
            </div>

            <div className='flex m-auto justify-between items-center border-y p-1'>
            <FaCircleMinus className='cursor-pointer text-red-500'/>
                <div className='text-center'>
                    <h2 className='text-md font-bold'>BMW</h2>
                    <h4 className='text-sm'>Bayerische MW</h4>
                </div>
                <div>
                    <h2 className='text-md font-bold'>110,19$</h2>
                    <div className='flex text-red-500'>
                        <FaArrowUp className=' mr-1'/>
                        <h4 className='text-sm'>1.09%</h4>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default StocksWatchList