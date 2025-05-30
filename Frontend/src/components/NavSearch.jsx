import { useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import { ModalContext } from "./Providers/ModalProvider";
import AuthContext from "../context/AuthContext";
import Icon from "./Icon";

const NavSearch = () => {
  const { dispatch } = useContext(ModalContext);
  const { user } = useContext(AuthContext);

  const generateModal = () => {
    if (!user) dispatch({ type: "OPEN_MODAL", name: "loginModal" });
    else
      dispatch({
        type: "OPEN_MODAL",
        name: "searchBox",
      });
  };

  return (
    <div className="flex justify-center items-center relative text-xs">
      <input type="text" className="input" placeholder="Search ..." />
      <div className="absolute right-2 flex items-center gap-2">
        <Icon Icon={IoMdSearch} fn={generateModal} />
      </div>
    </div>
  );
};

export default NavSearch;
