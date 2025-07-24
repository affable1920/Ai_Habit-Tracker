import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./Providers/AuthProvider";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  if (user) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoute;
