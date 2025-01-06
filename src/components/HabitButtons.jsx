import React, { useContext, useState } from "react";
import Tooltip from "./Tooltip";
import TooltipContext from "../context/TooltipContext";
import { SlOptionsVertical } from "react-icons/sl";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { IoMdArchive } from "react-icons/io";
import DeleteIcon from "./DeleteIcon";

const HabitButtons = ({ onDropdownClick, habit }) => {
  const { tooltip } = useContext(TooltipContext);
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    {
      label: "Edit",
      component: <CiEdit className="text-xs h-3 w-3" />,
    },
    {
      label: "Delete",
      component: <DeleteIcon habitId={habit.id} />,
    },
    { label: "Archive", component: <IoMdArchive className="h-3 w-3" /> },
  ];

  return (
    <div className="flex items-center gap-1 relative">
      <IoMdArrowDropdown className="cursor-pointer" onClick={onDropdownClick} />
      <div className={`${"tooltip__container"}`}>
        {habit.id === tooltip?.id && tooltip?.delete && (
          <Tooltip tagline={tooltip?.delete} />
        )}
      </div>
      <SlOptionsVertical className="cursor-pointer text-xs" />
      {showOptions && (
        <ul
          className="absolute text-xs gap-1 -top-11 right-4
       bg-gray-700 text-white rounded-md flex items-center overflow-hidden"
        >
          {options.map((option) => (
            <li
              className="flex items-center gap-1 cursor-pointer p-2 tracking-wide hover:bg-gray-500 w-full rounded-sm
            transition-colors"
              key={option.label}
            >
              {option.component}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitButtons;
