import React, { createContext, useEffect, useContext, useState } from 'react';
import { Store } from './Store'
import { updateProfileInfo } from './profileInfoSlice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const [ isBusiness, setIsBusiness ] = useState(false);


  const login = (data) => {
    if (data.isBusiness) {
      setIsBusiness(true)
    }
    setLoggedIn(true);
    Store.dispatch(updateProfileInfo(data))
    localStorage.setItem('userData', JSON.stringify(data.email))
  };

  const logout = () => {

    setLoggedIn(false);
    setIsBusiness(false)
    Store.dispatch(updateProfileInfo(null))
  };

  return (
    <AuthContext.Provider value={ { isLoggedIn, login, logout, isBusiness } }>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
