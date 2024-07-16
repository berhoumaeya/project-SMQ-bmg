import React, { createContext, useEffect } from 'react';

const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  useEffect(() => {
    document.body.style.backgroundColor = '#eeeeee';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <BackgroundContext.Provider value={{}}>
      {children}
    </BackgroundContext.Provider>
  );
};
