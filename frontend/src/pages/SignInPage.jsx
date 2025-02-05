import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../AppContext.jsx';
import hash from 'hash.js';
import DOMPurify from 'dompurify';
import SignInWithSpotify from '../components/SigninWithSpotify.jsx';



const SignInPage = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const termsOfUseURL = "https://docs.google.com/document/d/1fJhJVNTQttQmb1X5EU139NY-5B16NJdBAh05l320_24/edit?usp=sharing";
  const privacyPolicyURL = "https://docs.google.com/document/d/1-Hzwkoy_fjP1v0tkilZEsOdSlkaumEpBJckR2P0iydI/edit?usp=sharing";

  const { setSharedUserEmail } = useContext(AppContext);
  
  const navigate = useNavigate();

  const signIn = async (event) => {

    event.preventDefault(); // Preventing the default form submission behavior
    
    const passwordHash = hash.sha256().update(document.getElementById("password").value).digest('hex');

    const user = {
      email: DOMPurify.sanitize(document.getElementById("email").value),
      password: passwordHash
    };
  
    if(user.email && user.password){
      try {
        const response = await axios.post(`${backendUrl}/users/signin`, user);
        console.log('signedin successfully!');

        const { token } = response.data;
        localStorage.setItem('authToken', token); // Storing the token to be used for authentication in future requests
        
        setSharedUserEmail(user.email);
        navigate('/dashboard');
      } catch (error) {
        if (error.response && error.response.status === 429) {
          alert('You have made too many requests. Please try again later.');
        } else {
          console.error('Error signing in user:', error);          
        }
      }
    }else {
      console.log('Please fill in all fields.');
    }

  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-white to-purple-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-purple-600 text-center">Welcome Back!</h2>
        <p className="text-gray-500 text-center mt-2">
          Sign in to your account
        </p>

        <form onSubmit={signIn} className="mt-6">
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

          <div className="mb-6">
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

          <button type="submit" className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200">
            Sign In
          </button>
        </form>
        
        <SignInWithSpotify />

        <div className="mt-6 text-center">
          <a href="https://drive.google.com/file/d/1V7IZQmq5cOKKIVwgtmGxF0cTzRJg_E9o/view?usp=sharing" className="text-sm text-yellow-500 hover:underline">
            Forgot your password?
          </a>
        </div>

        <div className="mt-2 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/" className="text-yellow-500 font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our <a href={termsOfUseURL} className="text-purple-600 hover:underline">terms of use</a> and <a href={privacyPolicyURL} className="text-purple-600 hover:underline">privacy policy</a>
        </div>
        
      </div>
    </div>
  )
}

export default SignInPage