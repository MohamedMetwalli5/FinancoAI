import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header';
import { useContext } from "react";
import { AppContext } from '../AppContext.jsx';


const Home = () => {

  const { sharedUserEmail } = useContext(AppContext);
  
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
