import React, { useContext } from "react";
import Tooltip from "./Tooltip";
import TooltipContext from "../context/TooltipContext";
import { IoMdArrowDropdown } from "react-icons/io";
import HabitOptions from "./HabitOptions";
import DeleteIcon from "./DeleteIcon";

const HabitButtons = ({ onDropdownClick, habit }) => {
  const { tooltip } = useContext(TooltipContext);

  return (
    <div className="flex items-center gap-1 relative">
      <IoMdArrowDropdown className="icon" onClick={onDropdownClick} />
      <div className={`${"tooltip__container"}`}>
        {habit.id === tooltip?.id && tooltip?.delete && (
          <Tooltip tagline={tooltip?.delete} />
        )}
        <DeleteIcon habitId={habit.id} />
      </div>
      <HabitOptions habit={habit} />
    </div>
  );
};

export default HabitButtons;
