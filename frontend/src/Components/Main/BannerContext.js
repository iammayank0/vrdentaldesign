import React, { useState, createContext } from 'react';

export const BannerContext = createContext();

export const BannerContextProvider = ({ children }) => {
  const [bannerBackground, setBannerBackground] = useState('');

  return (
    <BannerContext.Provider value={{ bannerBackground, setBannerBackground }}>
      {children}
    </BannerContext.Provider>
  );
};
