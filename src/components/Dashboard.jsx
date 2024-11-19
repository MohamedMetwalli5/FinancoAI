import Overview from "./dashboard-components/Overview";
import Stocks from "./dashboard-components/Stocks";
import Header from "./Header";

const Dashboard = () => {
  const name = "Mohamed";
  const ThereAreNotifications = false;
  
  return (
    <>
      <Overview />
      <Stocks />
    </>
  );
};

export default Dashboard;
