import {FaWallet, FaEllipsisVertical, FaArrowRightToBracket, FaArrowRightFromBracket, FaArrowTrendUp, FaArrowTrendDown} from 'react-icons/fa6';

const OverviewCards = () => {
  return (
    <div className="flex-1">
        <div className="mt-4 p-1">
            <h1 className="font-bold text-lg mb-2">Overview</h1>
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 mr-4">
        
            <div className="flex flex-col border rounded-lg text-black shadow-md relative cursor-pointer">
                    <div className='flex-1 bg-blue-200 w-full p-3 m-auto rounded-tr-lg rounded-tl-lg'>
                        <FaWallet/>
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-semibold text-xl">Balance</span>
                            <button className="text-gray-500">
                                <FaEllipsisVertical/>
                            </button>
                        </div>
                    </div>
                    <div className='flex-2 bg-blue-100 w-full p-3 rounded-br-lg m-auto rounded-bl-lg'>
                        <div className="text-3xl font-bold mb-2">$1,655</div>
                        <div className="text-green-500 text-sm">+12% <FaArrowTrendUp/></div>
                        <div className="absolute bottom-2 right-2">
                            {/* Placeholder for the card image */}
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col border rounded-lg text-black shadow-md relative cursor-pointer">
                    <div className='flex-1 bg-purple-200 w-full p-3 m-auto rounded-tr-lg rounded-tl-lg'>
                        <FaArrowRightToBracket/>
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-semibold text-xl">Income</span>
                            <button className="text-gray-500">
                                <FaEllipsisVertical/>
                            </button>
                        </div>
                    </div>
                    <div className='flex-2 bg-purple-100 w-full p-3 rounded-br-lg m-auto rounded-bl-lg'>
                        <div className="text-3xl font-bold mb-2">$435</div>
                        <div className="text-green-500 text-sm">+4% <FaArrowTrendUp/></div>
                        <div className="absolute bottom-2 right-2">
                            {/* Placeholder for the card image */}
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col border rounded-lg text-black shadow-md relative cursor-pointer">
                    <div className='flex-1 bg-green-200 w-full p-3 m-auto rounded-tr-lg rounded-tl-lg'>
                        <FaArrowRightFromBracket/>
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-semibold text-xl">Expenses</span>
                            <button className="text-gray-500">
                                <FaEllipsisVertical/>
                            </button>
                        </div>
                    </div>
                    <div className='flex-2 bg-green-100 w-full p-3 rounded-br-lg m-auto rounded-bl-lg'>
                        <div className="text-3xl font-bold mb-2">$842</div>
                        <div className="text-red-500 text-sm">-2% <FaArrowTrendDown/></div>
                        <div className="absolute bottom-2 right-2">
                            {/* Placeholder for the card image */}
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default OverviewCards