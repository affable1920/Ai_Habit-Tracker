import { useContext } from "react";
import { AuthContext } from "./Providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const { user } = useContext(AuthContext);

  if (user) return <Navigate to="/" />;
  return <Outlet />;
};

export default AuthRoutes;
