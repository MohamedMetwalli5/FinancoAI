import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const AIModelsPage = () => {
    return (
        <>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 pl-4 ml-64">
              <div>
                <Header />
              </div>
              <div className='bg-pink-200'>
                uiui
              </div>         
            </div>   
          </div>
        </>
        
      )
}

export default AIModelsPage