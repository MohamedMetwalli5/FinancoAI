import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header';
import { useContext, useEffect } from "react";
import { AppContext } from '../AppContext.jsx';
import { useNavigate } from 'react-router-dom';



const Home = () => {

  const { sharedUserEmail, setSharedUserEmail, setSharedUserName , setSignedinWithSpotify} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');
    const name = queryParams.get('name');

    if (token && email && name) {
      localStorage.setItem('authToken', token);
      setSharedUserEmail(email);
      setSharedUserName(name);
      setSignedinWithSpotify(true);
      navigate("/dashboard"); // to hide the displayed token and email displaying from the URL
    }
  }, [setSharedUserEmail]);

  if(!sharedUserEmail){
    return <></>
  }

  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 pl-4 ml-64">
        <Header/>
        <Dashboard/>
      </div>   
    </div>
  );
}

export default Home;