import React, { useState } from 'react';
import { FaBars, FaClipboardList, FaRegNewspaper, FaGear, FaRightFromBracket } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import TheWebsiteLogo from "../assets/TheWebsiteLogo.svg";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 text-gray-800 bg-white rounded-lg shadow-md lg:hidden"
      >
        <FaBars className="text-2xl" />
      </button>

      <div
        className={`fixed top-0 left-0 min-h-screen bg-white text-gray-800 p-4 font-bold rounded-r-lg shadow-md flex flex-col transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-20'
        } lg:w-64`}
      >
        <div className="flex flex-col items-center mb-10 flex-grow">
          {/* Title */}
          <h1
            onClick={() => navigate('/dashboard')}
            className={`mb-4 text-xl font-semibold text-gray-800 cursor-pointer transition-opacity duration-300 ${
              isOpen || 'hidden lg:block'
            }`}
          >
            FinancoAI
          </h1>
          {/* Logo */}
          <img
            onClick={() => navigate('/dashboard')}
            src={TheWebsiteLogo}
            alt="The Logo"
            className="cursor-pointer transition-all duration-300"
          />

          {/* Menu Items */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-start w-full p-3 mt-4 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <FaClipboardList className="mr-4 text-xl text-gray-700" />
            <span
              className={`transition-opacity duration-300 ${
                isOpen || 'hidden lg:block'
              }`}
            >
              Dashboard
            </span>
          </button>
          <button
            onClick={() => navigate('/market-news')}
            className="flex items-center justify-start w-full p-3 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <FaRegNewspaper className="mr-4 text-xl text-gray-700" />
            <span
              className={`transition-opacity duration-300 ${
                isOpen || 'hidden lg:block'
              }`}
            >
              Market News
            </span>
          </button>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center justify-start w-full p-3 mt-4 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <FaGear className="mr-4 text-xl text-gray-700" />
            <span
              className={`transition-opacity duration-300 ${
                isOpen || 'hidden lg:block'
              }`}
            >
              Settings
            </span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('sharedUserEmail');
              localStorage.removeItem('sharedUserName');
              localStorage.removeItem('signedinWithSpotify');
              localStorage.removeItem('spotifyPodcasts');
              navigate('/signin');
            }}
            className="flex items-center justify-start w-full p-3 mb-2 rounded-lg bg-gray-100 hover:bg-red-200 transition-all"
          >
            <FaRightFromBracket className="mr-4 text-xl text-gray-700" />
            <span
              className={`transition-opacity duration-300 ${
                isOpen || 'hidden lg:block'
              }`}
            >
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;