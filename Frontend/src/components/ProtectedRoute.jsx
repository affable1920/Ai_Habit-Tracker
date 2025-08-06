import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const ProtectedRoute = () => {
  const user = useAuthStore((s) => s.user);

  if (user) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoute;
