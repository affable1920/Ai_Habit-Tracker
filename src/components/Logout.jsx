import { useEffect } from "react";
import { toast } from "sonner";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    // navigate("/login", { replace: true });
    window.location = "/login";

    toast.success("Logged out !");
  }, []);

  return null;
};

export default Logout;
