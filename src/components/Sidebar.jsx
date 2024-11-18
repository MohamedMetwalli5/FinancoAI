import { FaClipboardList, FaRegLightbulb, FaMoneyBillWave, FaRegNewspaper, FaCircleUser, FaRightFromBracket } from 'react-icons/fa6';

const SideBar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white text-gray-800 p-4 text-center font-bold rounded-r-lg shadow-md flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-semibold mb-8 text-gray-800">FinancoAI</h1>
        
        <button className="flex items-center justify-start w-full p-3 mt-4 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
          <FaClipboardList className="mr-4 text-xl text-gray-700"/> Dashboard
        </button>
        <button className="flex items-center justify-start w-full p-3 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
          <FaRegLightbulb className="mr-4 text-xl text-gray-700" /> Analytics
        </button>
        <button className="flex items-center justify-start w-full p-3 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
          <FaMoneyBillWave className="mr-4 text-xl text-gray-700" /> Investments
        </button>
        <button className="flex items-center justify-start w-full p-3 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
          <FaRegNewspaper className="mr-4 text-xl text-gray-700" /> Market News
        </button>
      </div>

      <div>
        <button className="flex items-center justify-start w-full p-3 mt-4 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
          <FaCircleUser className="mr-4 text-xl text-gray-700" /> Profile
        </button>
        <button className="flex items-center justify-start w-full p-3 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
          <FaRightFromBracket className="mr-4 text-xl text-gray-700" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
