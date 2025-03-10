import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import { BiReset } from "react-icons/bi";
import { RiAddBoxFill } from "react-icons/ri";
import useHabits from "../hooks/useHabits";
import { MdArchive } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import tootlipStore from "../Tooltip/store";
import { QueryContext } from "./Providers/QueryProvider";

const HabitFilterButtons = () => {
  const queryObject = {
    pageSize: 10,
    currentPage: 1,
  };

  const { dispatch: queryDispatch } = useContext(QueryContext);

  const { data } = useHabits();
  const { user } = useContext(AuthContext);

  const { show, hide } = tootlipStore();

  return (
    <div className="flex items-center justify-between justify-self-start">
      <div className="flex items-center gap-2">
        {(user || (user && data?.habits.length !== 0)) && (
          <Link to="/add">
            <RiAddBoxFill className="icon__with__bg__large cp" />
          </Link>
        )}
        <SearchBar />
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
            onClick={() => queryDispatch({ type: "reset", state: queryObject })}
            onMouseEnter={() =>
              show({ msg: "Reset queries", element: ".reset" })
            }
            onMouseLeave={hide}
          />
          <span
            className="cp font-semibold border-slate-300 p-[4px] bg-secondary__lighter text-white
          rounded-md ml-2 mr-1 text-xs font-mono bg-accent__primary block dark:bg-slate-300 dark:text-black"
          >
            {data?.habits?.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HabitFilterButtons;
