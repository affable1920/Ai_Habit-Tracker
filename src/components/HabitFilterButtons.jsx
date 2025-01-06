import React, { useContext } from "react";
import Tooltip from "./Tooltip";
import SearchBar from "./SearchBar";
import TooltipContext from "../context/TooltipContext";
import QueryContext from "../context/QueryContext";
import { BiReset } from "react-icons/bi";
import StatusFilter from "./StatusFilter";

const HabitFilterButtons = () => {
  const queryObject = {
    pageSize: 10,
    searchQuery: "",
    currentPage: 1,
  };

  const { tooltip, dispatch: tooltipDispatch } = useContext(TooltipContext);
  const { dispatch: queryDispatch } = useContext(QueryContext);

  return (
    <div className="flex items-center justify-between">
      <SearchBar />
      <div
        className={`${tooltip && "tooltip__container"} flex items-center gap-4`}
      >
        <div>
          <StatusFilter />
        </div>
        <div>
          <BiReset
            onMouseEnter={() =>
              tooltipDispatch({
                type: "reset",
                tooltip: "Reset all filters",
              })
            }
            onMouseLeave={() => tooltipDispatch({ type: "clear" })}
            className="cp"
            onClick={() => queryDispatch({ type: "reset", state: queryObject })}
          />
          {tooltip?.reset && <Tooltip tagline={tooltip?.reset} />}
        </div>
      </div>
    </div>
  );
};

export default HabitFilterButtons;
