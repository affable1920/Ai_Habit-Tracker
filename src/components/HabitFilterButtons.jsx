import React, { useContext } from "react";
import TooltipContext from "../context/TooltipContext";
import QueryContext from "../context/QueryContext";
import { BiReset } from "react-icons/bi";
import SearchBar from "./SearchBar";

const HabitFilterButtons = () => {
  const { tooltip, dispatch: tooltipDispatch } = useContext(TooltipContext);
  const { dispatch: queryDispatch } = useContext(QueryContext);

  return (
    <div className="flex items-center justify-between">
      <SearchBar />
      <div className={`${tooltip && "tooltip__container"}`}>
        <BiReset
          onMouseEnter={() =>
            handleMouseEnter({
              type: "reset",
              tooltip: "Reset all filters",
            })
          }
          onMouseLeave={() => tooltipDispatch({ type: "clear", init: {} })}
          className="cp"
          onClick={() => queryDispatch({ type: "reset", state: queryObject })}
        />
        {tooltip?.reset && <Tooltip tagline={tooltip?.reset} />}
      </div>
    </div>
  );
};

export default HabitFilterButtons;
