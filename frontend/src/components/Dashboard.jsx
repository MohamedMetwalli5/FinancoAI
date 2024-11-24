import Overview from "./dashboard-components/Overview";
import Stocks from "./dashboard-components/Stocks";
import { useLocation } from 'react-router-dom';

const Dashboard = ({email}) => {
  
  // const location = useLocation();
  // const { email } = location.state || {};
  const ThereAreNotifications = false;
  
  return (
    <>
      <Overview email={email}/>
      <Stocks email={email}/>
    </>
  );
};

export default Dashboard;
