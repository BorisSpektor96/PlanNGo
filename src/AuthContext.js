import React, { createContext, useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [ isLoggedIn, setLoggedIn ] = useState(false);

  const login = (data) => {
    localStorage.setItem('userData', JSON.stringify(data))
    console.log(data)
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={ { isLoggedIn, login, logout } }>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
