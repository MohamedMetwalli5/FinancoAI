import React from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {

  const navigate = useNavigate();

  const addUser = async (event) => {

    event.preventDefault(); // Preventing the default form submission behavior

    const newUser = {
      id: uuidv4(),  // Unique user ID
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
  
    if(newUser.name.length > 0 && newUser.email.length > 0 && newUser.password.length > 0){
      try {
        const response = await axios.post('http://localhost:5000/signup', newUser);
        console.log('User added:', response.data);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }else {
      console.log('Please fill in all fields.');
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-white to-purple-100">
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
    </div>
  )
}

export default SignUpPage
