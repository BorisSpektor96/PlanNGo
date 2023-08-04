import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const [ isBusiness, setIsBusiness ] = useState(false);

  const login = (data) => {
    localStorage.setItem('userData', JSON.stringify(data))
    if (data.isBusiness) {
      setIsBusiness(true)
    }
    setLoggedIn(true);
  };

  useEffect(() => {
    console.log(isBusiness)
  }, [ isBusiness ])

  const logout = () => {
    localStorage.removeItem('userData');
    setLoggedIn(false);
    setIsBusiness(false)
  };

  return (
    <AuthContext.Provider value={ { isLoggedIn, login, logout, isBusiness } }>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
