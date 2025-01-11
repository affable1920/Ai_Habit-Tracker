import { useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    navigate("/");
  }, []);
};

export default Logout;
