import Overview from "./dashboard-components/Overview";
import Stocks from "./dashboard-components/Stocks";
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  
  const location = useLocation();
  const { email } = location.state || {};
  const ThereAreNotifications = false;
  
  return (
    <>
      <Overview />
      <Stocks />
    </>
  );
};

export default Dashboard;
