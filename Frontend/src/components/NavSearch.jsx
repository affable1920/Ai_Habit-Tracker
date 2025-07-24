import { useContext } from "react";
import { ModalContext } from "./Providers/ModalProvider";
import AuthContext from "../context/AuthContext";
import { IoMdSearch } from "react-icons/io";
import IconComponent from "./IconComponent";

const NavSearch = () => {
  const { dispatch } = useContext(ModalContext);
  const { user } = useContext(AuthContext);

  const generateModal = () => {
    if (!user) dispatch({ type: "OPEN_MODAL", name: "loginModal" });
    else
      dispatch({
        type: "OPEN_MODAL",
        name: "search_box",
      });
  };

  const shortcutBtn = <div className="italic font-medium">Ctrl K</div>;
  const classes = `font-medium mr-2 p-[2px]`;

  return (
    <IconComponent
      Icon={IoMdSearch}
      bg
      fn={generateModal}
      children={shortcutBtn}
      chClass={classes}
    />
  );
};

export default NavSearch;
