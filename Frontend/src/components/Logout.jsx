import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { ModalContext } from "./Providers/ModalProvider";

const Logout = () => {
  const navigate = useNavigate();

  const { logout, token } = useContext(AuthContext);
  const { modals, dispatch } = useContext(ModalContext);

  console.log("Logout called.")
  console.log(token)

  useEffect(() => {
    try {
      if (modals.open.length != 0)
      dispatch({ type: "CLOSE_ALL" });

      toast.info("Logging out...")
      logout();

      navigate("/login");
      toast.info("Logged out !");
    } catch (ex) {}
  }, [token]);

  return null;
};

export default Logout;
