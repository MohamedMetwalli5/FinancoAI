import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext.jsx';
import { useContext } from 'react';
import hash from 'hash.js';
import DOMPurify from 'dompurify';
import RightCharacterSticker from "../assets/images/RightCharacterSticker.svg";
import LeftCharacterSticker from "../assets/images/LeftCharacterSticker.svg";



const SignUpPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const { setSharedUserEmail } = useContext(AppContext);
  const [areAgreementsChecked, setAreAgreementsChecked] = useState(false);
  const termsOfUseURL = "https://docs.google.com/document/d/1fJhJVNTQttQmb1X5EU139NY-5B16NJdBAh05l320_24/edit?usp=sharing";
  const privacyPolicyURL = "https://docs.google.com/document/d/1-Hzwkoy_fjP1v0tkilZEsOdSlkaumEpBJckR2P0iydI/edit?usp=sharing";

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setAreAgreementsChecked(!areAgreementsChecked);
  };

  const addUser = async (event) => {
    event.preventDefault();
    const unHashedPassword = document.getElementById("password").value;
    const unHashedPasswordConfirmation = document.getElementById("confirm-password").value;

    const passwordHash = hash.sha256().update(document.getElementById("password").value).digest('hex');
    const newUser = {
      id: uuidv4(),
      name: DOMPurify.sanitize(document.getElementById("name").value),
      email: DOMPurify.sanitize(document.getElementById("email").value),
      passwordHash,
      preferences: {
        timezone: "UTC",
        emailNotifications: false,
      },
    };

    if (!areAgreementsChecked) {
      alert("You must agree to the terms of use and privacy policy.");
    } else if (unHashedPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
    } else if (unHashedPassword !== unHashedPasswordConfirmation) {
      alert("Password and confirmation do not match.");
    } else if (newUser.name && newUser.email && newUser.passwordHash && areAgreementsChecked) {
      try {
        const response = await axios.post(`${backendUrl}/users/signup`, newUser);
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        console.log("User added and token stored:", response.data);
        
        setSharedUserEmail(newUser.email);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error adding user:", error.response?.data || error.message);
      }
    } else {
      console.log("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-evenly bg-gradient-to-r from-purple-50 via-white to-purple-100 relative">
      {/* The Left Sticker */}
      <img
        src={LeftCharacterSticker}
        alt=""
        className="w-0 h-0 md:w-52 md:h-52"
      />

      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-purple-600 text-center">Create Your Account</h2>
        <p className="text-gray-500 text-center mt-2">
          Join us to unlock amazing features!
        </p>

        <form onSubmit={addUser} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-purple-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Mohamed Metwalli"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-purple-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-purple-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-purple-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
            />
          </div>

          <div className="my-3 flex items-center">
            <input 
              type="checkbox" 
              checked={areAgreementsChecked} 
              onChange={handleCheckboxChange} 
            />
            <label className="ml-3">
              I agree to the <a href={termsOfUseURL} className="text-purple-600 hover:underline">terms of use</a> and <a href={privacyPolicyURL} className="text-purple-600 hover:underline">privacy policy</a>
            </label>
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/signin" className="text-yellow-500 font-medium hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>

      {/* The Right Sticker */}
      <img
        src={RightCharacterSticker}
        alt=""
        className="w-0 h-0 md:w-52 md:h-52"
      />

    </div>
  );
};

export default SignUpPage;
