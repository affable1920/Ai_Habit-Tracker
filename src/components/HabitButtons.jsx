import React, { useContext } from "react";
import Tooltip from "./Tooltip";
import TooltipContext from "../context/TooltipContext";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import HabitsContext from "../context/HabitsContext";

const HabitButtons = ({ onDropdownClick, habit }) => {
  const { tooltip, dispatch } = useContext(TooltipContext);
  const { habits, dispatch: habitsDispatch } = useContext(HabitsContext);

  return (
    <div className="flex items-center gap-2">
      <IoMdArrowDropdown className="cursor-pointer" onClick={onDropdownClick} />
      <div className={`${"tooltip__container"}`}>
        <MdDelete
          className="cp"
          onMouseEnter={() =>
            dispatch({
              type: "delete",
              tooltip: `Delete habit`,
              id: habit.id,
            })
          }
          onMouseLeave={() => dispatch({ type: "clear", init: {} })}
          onClick={() => habitsDispatch({ type: "DELETE", habitId: habit.id })}
        />
        {habit.id === tooltip?.id && tooltip?.delete && (
          <Tooltip tagline={tooltip?.delete} />
        )}
      </div>
      <HiDotsVertical className="cursor-pointer" />
    </div>
  );
};

export default HabitButtons;
