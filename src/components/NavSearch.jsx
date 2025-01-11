import React from "react";
import { IoMdSearch } from "react-icons/io";

const NavSearch = () => {
  return (
    <div className="flex justify-center items-center relative">
      <input type="text" className="input" placeholder="Search ..." />
      <div className="absolute right-2 flex items-center gap-2">
        <div className="flex items-center invisible md:visible gap-[2px]">
          <button
            className="text-[10px] bg-slate-600 text-slate-50 px-1 py-[1px] rounded-md 
            tracking-wide font-semibold"
          >
            Ctrl K
          </button>
        </div>
        <IoMdSearch className="icon" />
      </div>
    </div>
  );
};

export default NavSearch;
