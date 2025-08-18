import Button from "./Button";
import { IoMdSearch } from "react-icons/io";
import useAuthStore from "../stores/authStore";
import useModalStore from "../stores/modalStore";

const NavSearch = () => {
  const user = useAuthStore((s) => s.user);
  const openModal = useModalStore((s) => s.openModal);

  const generateModal = () => {
    if (!user) openModal("LOGIN");
    else openModal("SEARCH_BOX");
  };

  return (
    <Button bg onClick={generateModal} size="sm">
      Ctrl K <IoMdSearch />
    </Button>
  );
};

export default NavSearch;
