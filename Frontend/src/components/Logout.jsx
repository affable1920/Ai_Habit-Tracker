import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Providers/AuthProvider";

const Logout = () => {
  const { logout } = React.useContext(AuthContext);
  let navigate = useNavigate();

  React.useEffect(() => {
    logout();
    navigate("/login");
  }, []);

  return null;
};

export default Logout;
