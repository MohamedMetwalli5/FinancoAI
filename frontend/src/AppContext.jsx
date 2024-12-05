import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const DataProvider = ({ children }) => {
  
    // Retrieving the initial value from local storage or set it to an empty string
    const [sharedUserEmail, setSharedUserEmail] = useState(() => {
        return localStorage.getItem('sharedUserEmail') || "";
    });
    

    // Updating the local storage whenever the sharedUserEmail state changes
    useEffect(() => {
        localStorage.setItem('sharedUserEmail', sharedUserEmail);
    }, [sharedUserEmail]);

    return (
        <AppContext.Provider value={{ sharedUserEmail, setSharedUserEmail }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, DataProvider };
