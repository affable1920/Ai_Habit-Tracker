import { useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    toast.success("Successfully logged out.");

    navigate("/login");
  }, []);

  return null;
};

export default Logout;
