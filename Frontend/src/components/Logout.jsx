import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const Logout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  React.useEffect(() => {
    try {
      logout();
      navigate("/login");
    } catch (ex) {}
  }, []);

  return null;
};

export default Logout;
