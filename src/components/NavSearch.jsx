import React, { useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import { ModalContext } from "./Providers/ModalProvider";
import AuthContext from "../context/AuthContext";

const NavSearch = () => {
  const { dispatch } = useContext(ModalContext);
  const { user } = useContext(AuthContext);

  const generateModal = () => {
    if (!user) dispatch({ type: "OPEN_MODAL", modalToShow: "loginModal" });
    else
      dispatch({
        type: "OPEN_MODAL",
        modalToShow: "searchBox",
      });
  };
  return (
    <div className="flex justify-center items-center relative">
      <input
        type="text"
        className="input shadow-md dark:bg-color__secondary border-[1px] border-slate-300
         dark:border-[2px] dark:border-stone-800"
        placeholder="Search ..."
      />
      <div className="absolute right-2 flex items-center gap-2">
        <button
          onClick={generateModal}
          className="text-xs bg-transparent border-[2px] p-1 w-20 py-[2px] rounded-md border-slate-400 
        flex items-center gap-2 dark:bg-color__secondary dark:border-color__secondary__lighter font-mono"
        >
          Ctrl K
          <IoMdSearch className="cp" />
        </button>
      </div>
    </div>
  );
};

export default NavSearch;
