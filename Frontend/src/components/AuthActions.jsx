import { useLocation, Link } from "react-router-dom";
import useModalStore from "../stores/modalStore";
import useAuthStore from "../stores/authStore";
import NavSearch from "./NavSearch";
import Button from "./Button";
import { TbUserDown } from "react-icons/tb";
import ThemeToggler from "./ThemeToggler";

const AuthActions = () => {
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);

  const currentModal = useModalStore((s) => s.currentModal);

  const user = useAuthStore((s) => s.user);
  const { pathname: route } = useLocation();

  const toggleModal = () =>
    currentModal === "USER_ACTIONS" ? closeModal() : openModal("USER_ACTIONS");

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2.5">
        <NavSearch />
        <ThemeToggler />
      </div>

      {route != "/login" && !user && (
        <Link to="/login">
          <button className="button bg-amber-600">Log in</button>
        </Link>
      )}

      <div className=" gap-3">
        {user && (
          <Button bg onClick={toggleModal}>
            <TbUserDown />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthActions;
