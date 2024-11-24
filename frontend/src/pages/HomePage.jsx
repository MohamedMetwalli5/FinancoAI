import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const { email } = location.state || {};
  return (
    <div className="flex h-screen">
      <Sidebar email={email}/>
      <div className="flex-1 pl-4 ml-64">
        <Header email={email}/>
        <Dashboard email={email}/>
      </div>   
    </div>
  );
}

export default Home;
