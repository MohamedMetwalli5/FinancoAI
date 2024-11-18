import { 
    FaWallet, 
    FaEllipsisVertical, 
    FaArrowRightToBracket, 
    FaArrowRightFromBracket, 
    FaArrowTrendUp, 
    FaArrowTrendDown 
  } from 'react-icons/fa6';
  
  const OverviewCards = () => {
    return (
      <div className="flex-1 mt-4 p-1">
        <h1 className="font-bold text-lg mb-2">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mr-4">
          {/* Card 1 */}
          <article className="flex flex-col border rounded-lg text-black shadow-md relative cursor-pointer overflow-hidden">
            <div className="flex-1 bg-blue-200 w-full p-3 rounded-tr-lg rounded-tl-lg">
              <div className="flex justify-between items-center mb-6">
                <FaWallet className="text-xl" />
                <span className="font-semibold text-xl">Balance</span>
                <button className="text-gray-500">
                  <FaEllipsisVertical />
                </button>
              </div>
            </div>
            <div className="flex-2 bg-blue-100 w-full p-3 rounded-br-lg rounded-bl-lg">
              <div className="text-3xl font-bold mb-2">$1,655</div>
              <div className="text-green-500 text-sm flex items-center gap-1">
                +12% <FaArrowTrendUp />
              </div>
            </div>
          </article>
  
          {/* Card 2 */}
          <article className="flex flex-col border rounded-lg text-black shadow-md relative cursor-pointer overflow-hidden">
            <div className="flex-1 bg-purple-200 w-full p-3 rounded-tr-lg rounded-tl-lg">
              <div className="flex justify-between items-center mb-6">
                <FaArrowRightToBracket className="text-xl" />
                <span className="font-semibold text-xl">Income</span>
                <button className="text-gray-500">
                  <FaEllipsisVertical />
                </button>
              </div>
            </div>
            <div className="flex-2 bg-purple-100 w-full p-3 rounded-br-lg rounded-bl-lg">
              <div className="text-3xl font-bold mb-2">$435</div>
              <div className="text-green-500 text-sm flex items-center gap-1">
                +4% <FaArrowTrendUp />
              </div>
            </div>
          </article>
  
          {/* Card 3 */}
          <article className="flex flex-col border rounded-lg text-black shadow-md relative cursor-pointer overflow-hidden">
            <div className="flex-1 bg-green-200 w-full p-3 rounded-tr-lg rounded-tl-lg">
              <div className="flex justify-between items-center mb-6">
                <FaArrowRightFromBracket className="text-xl" />
                <span className="font-semibold text-xl">Expenses</span>
                <button className="text-gray-500">
                  <FaEllipsisVertical />
                </button>
              </div>
            </div>
            <div className="flex-2 bg-green-100 w-full p-3 rounded-br-lg rounded-bl-lg">
              <div className="text-3xl font-bold mb-2">$842</div>
              <div className="text-red-500 text-sm flex items-center gap-1">
                -2% <FaArrowTrendDown />
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  };
  
  export default OverviewCards;
  