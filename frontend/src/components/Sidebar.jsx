import { FaClipboardList, FaRobot, FaRegNewspaper, FaGear, FaRightFromBracket } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const SideBar = ({email}) => {

  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white text-gray-800 p-4 text-center font-bold rounded-r-lg shadow-md flex flex-col justify-between">
      <div>
        <h1 onClick={() => navigate('/dashboard', {state: {email: email}})} className="text-2xl font-semibold  text-gray-800 cursor-pointer">FinancoAI</h1>
        <img  onClick={() => navigate('/dashboard', {state: {email: email}})} src="\src\assets\TheWebsiteLogo.svg" alt="The Logo" className="items-center justify-center cursor-pointer mb-10 w-15 h -8" />

        <button onClick={() => navigate('/dashboard', {state: {email: email}})} className="flex items-center justify-start w-full p-3 mt-4 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
          <FaClipboardList className="mr-4 text-xl text-gray-700"/> Dashboard
        </button>
        <button onClick={() => navigate('/ai-models', {state: {email: email}})} className="flex items-center justify-start w-full p-3 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
          <FaRobot className="mr-4 text-xl text-gray-700" /> AI Models
        </button>
        <button onClick={() => navigate('/market-news', {state: {email: email}})} className="flex items-center justify-start w-full p-3 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
          <FaRegNewspaper className="mr-4 text-xl text-gray-700" /> Market News
        </button>
      </div>

      <div>
        <button onClick={() => navigate('/settings', {state: {email: email}})} className="flex items-center justify-start w-full p-3 mt-4 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
          <FaGear className="mr-4 text-xl text-gray-700" /> Settings
        </button>
        <button onClick={() => navigate('/signin')} className="flex items-center justify-start w-full p-3 mb-2 rounded-lg bg-gray-100 hover:bg-red-200 transition-all">
          <FaRightFromBracket className="mr-4 text-xl text-gray-700" /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;