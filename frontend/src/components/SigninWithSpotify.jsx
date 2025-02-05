import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaSpotify } from "react-icons/fa6";



const SignInWithSpotify = () => {  

    const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
    const spotifyClientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectURI = `${backendUrl}/OAuth2/SpotifySignin`;

    const handleSignIn = () => {
        const redirectUriEncoded = encodeURIComponent(redirectURI);
        const scopes = encodeURIComponent("user-read-email user-read-private");
        const state = uuidv4(); // CSRF protection
        
        // Redirecting the user to Spotify's authorization endpoint
        window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${spotifyClientID}&redirect_uri=${redirectUriEncoded}&scope=${scopes}&state=${state}`;
    };

    return (
        <button
            className="flex items-center justify-center w-full bg-green-400 hover:bg-green-500 text-white font-bold my-3 py-3 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={handleSignIn}
        >
            <FaSpotify className="w-5 h-5 mr-2"/>
            Sign In with Spotify
        </button>
    );
};

export default SignInWithSpotify;