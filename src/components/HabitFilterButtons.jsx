import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import SearchBar from "./SearchBar";
import TooltipContext from "../context/TooltipContext";
import QueryContext from "../context/QueryContext";
import StatusFilter from "./StatusFilter";
import { BiReset } from "react-icons/bi";
import { RiAddBoxFill } from "react-icons/ri";
import useHabits from "../hooks/useHabits";

const HabitFilterButtons = () => {
  const queryObject = {
    pageSize: 10,
    currentPage: 1,
  };

  const { tooltip, dispatch: tooltipDispatch } = useContext(TooltipContext);
  const { dispatch: queryDispatch } = useContext(QueryContext);
  const { data } = useHabits();

  return (
    <div className="flex items-center justify-between justify-self-start">
      <div className="flex items-center gap-2">
        <Link to="/add">
          <RiAddBoxFill
            size={25}
            className="dark:slate-400"
            onMouseEnter={() =>
              tooltipDispatch({
                type: "add",
                tooltip: "Add a habit !",
              })
            }
            onMouseLeave={() => tooltipDispatch({ type: "clear" })}
          />
        </Link>
        {tooltip?.add && <Tooltip tagline={tooltip?.add} />}
        <SearchBar />
      </div>
      <div
        className={`${tooltip && "tooltip__container"} flex items-center gap-4`}
      >
        <div>
          <StatusFilter />
        </div>
        <div className="flex items-center gap-1">
          <BiReset
            onMouseEnter={() =>
              tooltipDispatch({
                type: "reset",
                tooltip: "Reset all filters",
              })
            }
            onMouseLeave={() => tooltipDispatch({ type: "clear" })}
            className="icon"
            onClick={() => queryDispatch({ type: "reset", state: queryObject })}
          />
          {tooltip?.reset && <Tooltip tagline={tooltip?.reset} />}
          <div className={`${tooltip && "tooltip_container"}`}>
            <span
              onMouseEnter={() =>
                tooltipDispatch({ type: "count", tooltip: `Total Habits` })
              }
              onMouseLeave={() => tooltipDispatch({ type: "clear" })}
              className="cp font-semibold border-slate-300 p-[2px] px-[3px] rounded-md ml-2 mr-1 
              text-xs font-mono bg-color__accent__primary text-white block"
            >
              {data?.habits?.length}
            </span>
            {tooltip?.count && <Tooltip tagline={tooltip?.count} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitFilterButtons;
