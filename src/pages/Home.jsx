import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

const Home = () => {
  return (
    <div className='flex h-screen'>
      <div className='w-64 bg-slate-100 text-black p-2 text-center font-bold rounded-lg'>
        <Sidebar/> 
      </div>
      <div className='flex-1 p-4'>
        <Dashboard/>
      </div>   
    </div>
  )
}

export default Home