import { useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import loadingStore from "../stores/loadingStore";

const Logout = () => {
  const navigate = useNavigate();
  const { setLoading, loading } = loadingStore();

  console.log(loading);

  useEffect(() => {
    setLoading(true);
    try {
      authService.logout();

      toast.success("Successfully logged out.");
      window.location.reload();
      navigate("/login");
    } catch (e) {
      toast.error(e?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return null;
};

export default Logout;
