import {FaClipboardList, FaRegLightbulb, FaMoneyBillWave, FaRegNewspaper, FaCircleUser, FaRightFromBracket} from 'react-icons/fa6';

const SideBar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-100 text-black p-2 text-center font-bold rounded-lg flex flex-col justify-between">
      <div>
        <h1 className="text-lg mb-5">FinancoAI</h1>
        <button className="hover:bg-slate-300 mt-2 w-full border border-solid border-gray-400 p-2 rounded-md">
          <FaClipboardList className='inline-block mr-2 text-lg'/>Dashboard
        </button>
        <button className="hover:bg-slate-300 mt-2 w-full border border-solid border-gray-400 p-2 rounded-md">
          <FaRegLightbulb className='inline-block mr-2 text-lg'/>Analytics
        </button>
        <button className="hover:bg-slate-300 mt-2 w-full border border-solid border-gray-400 p-2 rounded-md">
        <FaMoneyBillWave className='inline-block mr-2 text-lg'/>Investments
        </button>
        <button className="hover:bg-slate-300 mt-2 w-full border border-solid border-gray-400 p-2 rounded-md">
        <FaRegNewspaper className='inline-block mr-2 text-lg'/>Market News
        </button>
      </div>

      <div>
        <button className="hover:bg-slate-300 mt-2 w-full border border-solid border-gray-400 p-2 rounded-md">
          <FaCircleUser className='inline-block mr-2 text-lg'/> Profile
        </button>
        <button className="hover:bg-slate-300 mt-2 w-full border border-solid border-gray-400 p-2 rounded-md">
          <FaRightFromBracket className='inline-block mr-2 text-lg'/>Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
