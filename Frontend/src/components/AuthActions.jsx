import { useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "./Providers/AuthProvider";
import { ModalContext } from "./Providers/ModalProvider";
import NavSearch from "./NavSearch";
import ThemeToggler from "./ThemeToggler";
import IconComponent from "./IconComponent";
import { TbUserDown } from "react-icons/tb";

const AuthActions = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const { modal, dispatch } = useContext(ModalContext);

  const { user } = useContext(AuthContext);
  const { pathname: route } = useLocation();

  return (
    <div className="flex items-center gap-6 md:gap-12">
      <div className="flex items-center gap-2">
        <NavSearch />
      </div>

      {route != "/login" && !user && (
        <Link to="/login" className="lg:order-10">
          <button className="btn btn__accent">Log in</button>
        </Link>
      )}

      <div className=" flex items-center gap-3 flex-wrap">
        <ThemeToggler />
        {user && (
          <>
            <IconComponent
              bg
              Icon={TbUserDown}
              fn={() =>
                dispatch({
                  type: "OPEN_MODAL",
                  name: "user_action",
                  keepPrevious: true,
                })
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AuthActions;
