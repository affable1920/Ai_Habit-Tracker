import { useEffect } from "react";
import { toast } from "sonner";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const nav = useNavigate();
  console.log(nav);

  useEffect(() => {
    authService.logout();
    window.location = "/";

    toast.success("Logged out !");
  }, []);

  return null;
};

export default Logout;
