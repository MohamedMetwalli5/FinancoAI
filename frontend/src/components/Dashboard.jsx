import Overview from "./dashboard-components/Overview";
import Stocks from "./dashboard-components/Stocks";


const Dashboard = () => {
  
  const ThereAreNotifications = false;
  
  return (
    <>
      <Overview/>
      <Stocks/>
    </>
  );
};

export default Dashboard;
