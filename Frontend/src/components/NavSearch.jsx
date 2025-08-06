import IconComponent from "./IconComponent";
import useAuthStore from "../stores/authStore";
import useModalStore from "../stores/modalStore";
import { MODALS } from "../../constants/MODALS";
import { IoMdSearch } from "react-icons/io";

const NavSearch = () => {
  const user = useAuthStore((s) => s.user);
  const openModal = useModalStore((s) => s.openModal);

  const generateModal = () => {
    if (!user) openModal(MODALS.LOGIN);
    else openModal(MODALS.SEARCH_BOX);
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
