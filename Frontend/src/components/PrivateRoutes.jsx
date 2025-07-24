import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./Providers/AuthProvider";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoutes;
