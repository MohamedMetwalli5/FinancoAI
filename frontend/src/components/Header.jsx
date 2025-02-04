import Notifications from "../components/notifications/Notifications";
import NoNotifications from "../components/notifications/NoNotifications";
import PersonalPhoto from '../assets/images/PersonalPhoto.png';
import Searchbar from "./header-components/Searchbar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from '../AppContext.jsx';



const Header = () => {

  const { sharedUserEmail } = useContext(AppContext);

  const name = sharedUserEmail.substring(0, sharedUserEmail.indexOf("@")) + "...";

  const ThereAreNotifications = false;
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between pb-4 p-1">
        <div>
          <h1 className="text-2xl font-bold text-black-500 font-serif">Good morning, {name} </h1>
          <h2 className="font-semibold text-gray-500">Long time no see</h2>
        </div>
      
        <div className="flex space-x-4">
          <div className="flex-2 text-black p-3 w-80">
            <Searchbar/> 
          </div>
          {/* {ThereAreNotifications == true? <Notifications /> : <NoNotifications />} */}
          <div onClick={() => navigate('/settings')} className="flex items-center justify-center p-4 cursor-pointer">
            <h3 className="font-bold text-black mr-2">{name} </h3>
            <img
              src={PersonalPhoto}
              alt="Profile Photo"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
