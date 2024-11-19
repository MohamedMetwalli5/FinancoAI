import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 pl-4 ml-64">
        <Header />
        <Dashboard />
      </div>   
    </div>
  );
}

export default Home;
