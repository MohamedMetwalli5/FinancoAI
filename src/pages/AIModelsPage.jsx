import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

const AIModelsPage = () => {
  
  const location = useLocation();
  const {email} = location.state || {};
  
  const name = email;

  return (
    <>
      <div className="flex h-screen">
        <Sidebar email={email}/>
        <div className="flex-1 pl-4 ml-64">
          <div>
            <Header email={email}/>
          </div>
          <div id="Chatting" className="flex flex-col items-center justify-center h-full bg-gradient-to-br rounded-lg from-purple-100 to-white text-gray-800">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Hi, {name}</h1>
              <p className="text-xl mt-2">Can I help you with anything?</p>
              <p className="text-gray-600 mt-2">
                Welcome to FinancoAI, your partner for smarter financial decisions and insights!
              </p>
            </div>

            {/* Options Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12 max-w-4xl">
              <button className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition">
                <div className="text-4xl mb-2">📊</div>
                <h2 className="text-lg font-bold">Financial Forecast</h2>
                <p className="text-gray-600 mt-1">Get predictions for your financial future</p>
              </button>

              <button className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition">
                <div className="text-4xl mb-2">💡</div>
                <h2 className="text-lg font-bold">Investment Ideas</h2>
                <p className="text-gray-600 mt-1">Discover the best investment opportunities</p>
              </button>

              <button className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition">
                <div className="text-4xl mb-2">🛍️</div>
                <h2 className="text-lg font-bold">Budget Planning</h2>
                <p className="text-gray-600 mt-1">Get personalized AI-powered budgeting insights</p>
              </button>

            </div>

            {/* Chat Input Section */}
            <div className="mt-8 w-full px-4 md:w-3/4 lg:w-1/2">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                <input
                  type="text"
                  placeholder="Message FinancoAI"
                  className="flex-grow p-4 focus:outline-none"
                />
                <button className="bg-purple-500 text-white px-6 py-2 hover:bg-purple-600">
                  Send <span className="ml-2">➜</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIModelsPage;
