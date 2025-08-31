import { useLocation, Link } from "react-router-dom";
import useModalStore from "../stores/modalStore.js";
import useAuthStore from "../stores/authStore.js";
import NavSearch from "./NavSearch.js";
import Button from "./Interactives/Button.js";
import { TbUserDown } from "react-icons/tb";
import ThemeToggler from "./ThemeToggler.js";

const authRoutes = { login: true, register: true };

const AuthActions = () => {
  const openModal = useModalStore((s) => s.openModal);

  const user = useAuthStore((s) => s.user);
  const { pathname: route } = useLocation();

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2.5">
        <NavSearch />
        <ThemeToggler />
      </div>

      <div className="flex items-center gap-3">
        {!user && authRoutes[route] && (
          <Link to="">
            <Button className="px-2" color="accent">
              Login
            </Button>
          </Link>
        )}
        {user && (
          <Button onClick={() => openModal("USER_ACTIONS")}>
            <TbUserDown />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthActions;
