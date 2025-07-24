import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { ModalContext } from "./Providers/ModalProvider";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const { dispatch } = useContext(ModalContext);

  useEffect(() => {
    try {
      toast.info("Logging out...")
      logout();
      dispatch({ type: "CLOSE_ALL" });

      navigate("/login");
      toast.info("Logged out !");
    } catch (ex) {}
  }, []);

  return null;
};

export default Logout;
