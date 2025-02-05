import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const DataProvider = ({ children }) => {
  
    // Retrieving the initial value from local storage or set it to an empty string
    const [sharedUserEmail, setSharedUserEmail] = useState(() => {
        return localStorage.getItem('sharedUserEmail') || "";
    });

    // Retrieving the initial value from local storage or set it to an empty string
    const [sharedUserName, setSharedUserName] = useState(() => {
        return localStorage.getItem('sharedUserName') || "";
    });

    // Retrieving the initial value from local storage or set it to false
    const [signedinWithSpotify, setSignedinWithSpotify] = useState(() => {
        return localStorage.getItem('signedinWithSpotify') || "false";
    });

    // Retrieving the initial value from local storage or set it to an empty array
    const [spotifyPodcasts, setSpotifyPodcasts] = useState(() => {
        const storedPodcasts = localStorage.getItem('spotifyPodcasts');
        return storedPodcasts ? JSON.parse(storedPodcasts) : [];
    });
    

    // Updating the local storage whenever the sharedUserEmail state changes
    useEffect(() => {
        localStorage.setItem('sharedUserEmail', sharedUserEmail);
    }, [sharedUserEmail]);

    // Updating the local storage whenever the sharedUserName state changes
    useEffect(() => {
        localStorage.setItem('sharedUserName', sharedUserName);
    }, [sharedUserName]);

    // Updating the local storage whenever the signedinWithSpotify state changes
    useEffect(() => {
        localStorage.setItem('signedinWithSpotify', signedinWithSpotify);
    }, [signedinWithSpotify]);

    // Updating the local storage whenever the spotifyPodcasts state changes
    useEffect(() => {
        localStorage.setItem('spotifyPodcasts', JSON.stringify(spotifyPodcasts));
    }, [spotifyPodcasts]);

    
    return (
        <AppContext.Provider value={{ sharedUserEmail, setSharedUserEmail, sharedUserName, setSharedUserName, signedinWithSpotify, setSignedinWithSpotify, spotifyPodcasts, setSpotifyPodcasts }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, DataProvider };
