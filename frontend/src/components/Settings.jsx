import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../AppContext.jsx';
import hash from 'hash.js';



const Settings = () => {

  const { sharedUserEmail } = useContext(AppContext);
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');


  const save = async (event) => {
    event.preventDefault();
    const passwordHash = hash.sha256().update(document.getElementById("password").value).digest('hex');
    const updatedUser = {
      name,
      passwordHash,
      timezone,
      emailNotifications,
    };

  
    if (updatedUser.name && updatedUser.passwordHash) {
      try {
        const response = await axios.put(`http://localhost:5000/users/${sharedUserEmail}`, updatedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('User info saved:', response.data);
      } catch (error) {
        console.error('Error updating user info:', error);
        alert("Failed to update user information.")
      }
    } else {
      console.log('Please fill in all fields.');
      alert("Please fill in all fields!");
    }
  };



  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${sharedUserEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Your account has been deleted!");
      localStorage.removeItem("authToken");
      navigate("/");
    } catch (error) {
      console.error('Error deleting user info:', error);
      alert("Error deleting account!");
    }
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex flex-col p-6 max-w-lg mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>

      <div className="flex items-center gap-3 mb-4">
        <label htmlFor="username" className="w-24">User Name</label>
        <input
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md p-2 w-full bg-slate-100 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your new username"
        />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <label htmlFor="password" className="w-24">Password</label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="rounded-md p-2 w-full bg-slate-100 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your new password"
        />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <label htmlFor="timezone" className="w-24">Timezone</label>
        <select
          id="timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="rounded-md p-2 w-full bg-slate-100 dark:bg-gray-700 dark:text-white cursor-pointer"
        >
          <option value="utc">UTC</option>
          <option value="est">EST (Eastern Standard Time)</option>
          <option value="pst">PST (Pacific Standard Time)</option>
          <option value="gmt">GMT (Greenwich Mean Time)</option>
        </select>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-medium">Email Notifications</h3>
        <label className="relative inline-block w-16 h-8 cursor-pointer">
          <input
            id="emailnotifications"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            type="checkbox"
            className="opacity-0 w-0 h-0 peer"
          />
          <span className="absolute inset-0 bg-gray-300 transition-colors rounded-full peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2"></span>
          <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform transform peer-checked:translate-x-8"></span>
        </label>
      </div>

      {/* <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-medium">Dark Mode</h3>
        <label className="relative inline-block w-16 h-8 cursor-pointer">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={handleDarkModeToggle}
            className="opacity-0 w-0 h-0 peer"
          />
          <span className="absolute inset-0 bg-gray-300 transition-colors rounded-full peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2"></span>
          <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform transform peer-checked:translate-x-8"></span>
        </label>
      </div> */}

      <div className="flex items-center gap-3 mb-2">
        <button onClick={save} className="text-purple-500 bg-purple-100 p-2 px-5 rounded-md">Save</button>
      </div>

      <div className="flex items-center gap-3 mt-14 mb-2">
        <button onClick={deleteAccount} className="text-red-500 bg-red-100 p-2 rounded-md">Delete Account</button>
      </div>
    </div>
  );
};

export default Settings;
