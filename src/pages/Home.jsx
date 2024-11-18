import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

const Home = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 ml-64">
        <Dashboard />
      </div>   
    </div>
  );
}

export default Home;
