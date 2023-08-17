import React, { createContext, useState } from 'react';
import { updateProfileInfo } from './profileInfoSlice';
import { useDispatch } from 'react-redux';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const [ isBusiness, setIsBusiness ] = useState(false);

  const dispatch = useDispatch()

  const login = (data) => {
    if (data.isBusiness) {
      setIsBusiness(true)
    }
    setLoggedIn(true);
    dispatch(updateProfileInfo(data))
    localStorage.setItem('userData', JSON.stringify(data.email))
  };

  const logout = () => {

    setLoggedIn(false);
    setIsBusiness(false)
    localStorage.setItem('userData', JSON.stringify(null))
    dispatch(updateProfileInfo(null))
  };

  return (
    <AuthContext.Provider value={ { isLoggedIn, login, logout, isBusiness } }>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
