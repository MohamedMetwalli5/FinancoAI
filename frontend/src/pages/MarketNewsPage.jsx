import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import News from '../components/market-news-components/News.jsx'
import PodcastsBanner from '../components/market-news-components/PodcastsBanner.jsx'
import { useContext } from "react";
import { AppContext } from '../AppContext.jsx';


const MarketNews = () => {
  
  const { sharedUserEmail, spotifyPodcasts } = useContext(AppContext);
  
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
          {spotifyPodcasts.length > 0 ? <PodcastsBanner /> : <></>}
          <div className='bg-slate-100 rounded-lg'>
            <News/>
          </div>         
        </div>   
      </div>
    </>
    
  )
}

export default MarketNews