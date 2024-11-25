import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import News from '../components/News'
import { useLocation } from 'react-router-dom'

const MarketNews = () => {

  const location = useLocation();
  const {email} = location.state || {};

  return (
    <>
      <div className="flex h-screen">
        <Sidebar email={email}/>
        <div className="flex-1 pl-4 ml-64">
          <div>
            <Header email={email}/>
          </div>
          <div className='bg-slate-100 rounded-lg'>
            <News />
          </div>         
        </div>   
      </div>
    </>
    
  )
}

export default MarketNews