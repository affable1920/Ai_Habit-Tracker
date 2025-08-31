import Button from "./Interactives/Button.js";
import { IoMdSearch } from "react-icons/io";
import useAuthStore from "../stores/authStore.js";
import useModalStore from "../stores/modalStore.js";

const NavSearch = () => {
  const user = useAuthStore((s) => s.user);
  const openModal = useModalStore((s) => s.openModal);

  const generateModal = () => {
    if (!user) openModal("LOGIN");
    else openModal("SEARCH_BOX");
  };

  return (
    <Button className="py-0.5 px-2" onClick={generateModal}>
      Ctrl K <IoMdSearch />
    </Button>
  );
};

export default NavSearch;
