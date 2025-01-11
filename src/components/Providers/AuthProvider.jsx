import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "../../context/AuthContext";
import authService from "../../services/authService";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscribe = onAuthStateChanged(authService.auth, (user) => {
      setUser(user);
    });

    return () => subscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
