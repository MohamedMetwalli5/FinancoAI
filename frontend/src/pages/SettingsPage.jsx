import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Settings from '../components/Settings'
import { useLocation } from 'react-router-dom'

const SettingsPage = () => {
  const location = useLocation();
  const { email } = location.state || {};

  return (
    <div className="flex h-screen">
      <Sidebar email={email}/>
      <div className="flex-1 pl-4 ml-64">
        <Header email={email}/>
        <Settings email={email}/>
      </div>   
    </div>
  )
}

export default SettingsPage