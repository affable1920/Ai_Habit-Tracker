import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    try {
      logout();

      navigate("/login");
      toast.success("Logged out !");
    } catch (ex) {}
  }, []);

  return null;
};

export default Logout;
