import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const AuthRoutes = () => {
  const user = useAuthStore((s) => s.user);

  if (user) return <Navigate to="/" />;
  return <Outlet />;
};

export default AuthRoutes;
