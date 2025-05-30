import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoutes;
