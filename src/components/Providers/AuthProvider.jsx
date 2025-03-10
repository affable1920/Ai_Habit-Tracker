import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "../../context/AuthContext";
import authService from "../../services/authService";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(
      authService.auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unSubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
