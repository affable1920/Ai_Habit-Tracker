import React, { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "../../context/AuthContext";
import authService from "../../services/authService";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(
      authService.auth,
      (user) => {
        user && setUser(user);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unSubscribe();
  }, [user]);

  const value = useMemo(() => ({ user }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
