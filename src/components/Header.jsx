import Notifications from "../components/notifications/Notifications";
import NoNotifications from "../components/notifications/NoNotifications";
import Searchbar from "./Searchbar";

const Header = () => {
  const name = "Mohamed";
  const ThereAreNotifications = false;
  
  return (
    <>
      <div className="flex items-center justify-between p-4b bg-orange-400 p-1">
        <div>
          <h1 className="text-2xl font-bold text-black-500 font-serif">Good morning, {name} </h1>
          <h2 className="font-semibold text-gray-500">Long time no see</h2>
        </div>
      
        <div className="flex space-x-4">
          <div className="flex-2 bg-blue-500 text-black p-3 w-80">
            <Searchbar/> 
          </div>
          {ThereAreNotifications == true? <Notifications /> : <NoNotifications />}
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
    </>
  );
};

export default Header;
