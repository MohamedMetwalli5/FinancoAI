import React, { createContext, useState } from 'react';

const AppContext = createContext();

const DataProvider = ({ children }) => {
    const [sharedUserEmail, setSharedUserEmail] = useState("");


  return (
    <AppContext.Provider value={{ sharedUserEmail, setSharedUserEmail }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, DataProvider };