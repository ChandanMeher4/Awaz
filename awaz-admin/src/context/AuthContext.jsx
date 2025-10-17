import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => {
    setIsAdmin(true);
  };

  const logout = () => {
    // We would also call a backend logout endpoint here
    setIsAdmin(false);
  };

  const value = {
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}