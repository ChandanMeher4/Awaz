
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  
  const [isStudent, setIsStudent] = useState(false);

  
  const loginAsStudent = () => {
    
    console.log("Entering as anonymous student");
    setIsStudent(true);
  };

  const logout = () => {
    console.log("Logging out student");
    setIsStudent(false);
  };

  const value = {
    isStudent,
    loginAsStudent,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}