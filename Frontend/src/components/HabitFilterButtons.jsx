import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import { BiReset } from "react-icons/bi";
import { RiAddBoxFill } from "react-icons/ri";
import { MdArchive } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import tootlipStore from "../Tooltip/store";
import queryStore from "../stores/queryStore";
import useHabitStore from "./habitStore";

const HabitFilterButtons = () => {
  const { user } = useContext(AuthContext);
  const habits = useHabitStore((s) => s.habits);

  const { show, hide } = tootlipStore();
  const reset = queryStore((s) => s.reset);

  return (
    <div className="flex items-center justify-between justify-self-start">
      <div className="flex items-center gap-2">
        {(user || (user && data?.habits.length !== 0)) && (
          <Link to="/add">
            <RiAddBoxFill className="icon__with__bg__large cp" />
          </Link>
        )}
        <SearchBar />
        <div>
          <Link
            to="/teamtab"
            className="text-xs italic bg-slate-100 p-2 py-[6px] rounded-lg shadow-md border-[1px] 
            dark:border-accent hover:border-accent dark:bg-accent__darker"
          >
            Team Tab
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Link to="/archived">
            <MdArchive
              className="archive"
              onMouseEnter={() =>
                show({ msg: "View Archived", element: ".archive" })
              }
              onMouseLeave={hide}
            />
          </Link>
        </div>
        <StatusFilter />
        <div className="flex items-center gap-1">
          <BiReset
            className="reset icon"
            onClick={reset}
            onMouseEnter={() =>
              show({ msg: "Reset queries", element: ".reset" })
            }
            onMouseLeave={hide}
          />
          <span
            className="cp font-semibold border-slate-300 p-[4px] bg-secondary__lighter text-white
          rounded-md ml-2 mr-1 text-xs font-mono bg-accent__primary block dark:bg-slate-300 dark:text-black"
          >
            {habits?.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HabitFilterButtons;
