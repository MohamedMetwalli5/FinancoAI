import Notifications from "../components/notifications/Notifications";
import NoNotifications from "../components/notifications/NoNotifications";

const Dashboard = () => {
  const name = "Mohamed";
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold text-black-500 font-serif">Good morning, {name} </h1>
        <h2 className="font-semibold text-gray-500">Long time no see</h2>
      </div>
    
      <div className="flex space-x-4">
        <div className="flex-1 bg-blue-500 text-white p-4">
          Part 1
        </div>
          <Notifications />
          {/* <NoNotifications /> */}
        <div className="flex items-center justify-center bg-red-500 p-4">
          <h3 className="font-bold text-white mr-2">{name} </h3>
          <img
            src="/src/assets/images/PersonalPhoto.png"
            alt="Profile Photo"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
