import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import News from '../components/News'
import { useContext } from "react";
import { AppContext } from '../AppContext.jsx';


const MarketNews = () => {
  
  const { sharedUserEmail } = useContext(AppContext);
  
  if(!sharedUserEmail){
    return <></>
  }

  return (
    <>
      <div className="flex h-screen">
        <Sidebar/>
        <div className="flex-1 pl-4 ml-64">
          <div>
            <Header/>
          </div>
          <div className='bg-slate-100 rounded-lg'>
            <News/>
          </div>         
        </div>   
      </div>
    </>
    
  )
}

export default MarketNews