import React from "react";
import { IoMdSearch } from "react-icons/io";

const NavSearch = () => {
  return (
    <div className="flex justify-center items-center relative">
      <input
        type="text"
        className="input shadow-md dark:bg-color__secondary border-[1px] border-slate-300
         dark:border-color__secondary__lighter"
        placeholder="Search ..."
      />
      <div className="absolute right-2 flex items-center gap-2">
        <button
          onClick={(e) => console.log(e)}
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
