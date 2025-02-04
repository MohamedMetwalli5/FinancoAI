import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Settings from '../components/Settings'
import { useContext } from "react";
import { AppContext } from '../AppContext.jsx';


const SettingsPage = () => {

  const { sharedUserEmail } = useContext(AppContext);
  
  if(!sharedUserEmail){
    return <></>
  }

  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 pl-4 ml-64">
        <Header/>
        <Settings/>
      </div>   
    </div>
  )
}

export default SettingsPage