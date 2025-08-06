import { useLocation, Link } from "react-router-dom";
import useModalStore from "../stores/modalStore";
import useAuthStore from "../stores/authStore";
import NavSearch from "./NavSearch";
import IconComponent from "./IconComponent";
import { MODALS } from "../../constants/MODALS";
import { TbUserDown } from "react-icons/tb";
import ThemeToggler from "./ThemeToggler";

const AuthActions = () => {
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);

  const currentModal = useModalStore((s) => s.currentModal);

  const user = useAuthStore((s) => s.user);
  const { pathname: route } = useLocation();

  const toggleModal = () => {
    if (currentModal == MODALS.USER_ACTIONS) closeModal();
    else openModal(MODALS.USER_ACTIONS);
  };

  return (
    <div className="flex items-center gap-6 md:gap-12">
      <div className="flex items-center gap-2">
        <NavSearch />
      </div>

      <ThemeToggler />

      {route != "/login" && !user && (
        <Link to="/login" className="lg:order-10">
          <button className="btn btn__accent">Log in</button>
        </Link>
      )}

      <div className=" flex items-center gap-3 flex-wrap">
        {user && (
          <>
            <IconComponent bg Icon={TbUserDown} fn={toggleModal} />
          </>
        )}
      </div>
    </div>
  );
};

export default AuthActions;
