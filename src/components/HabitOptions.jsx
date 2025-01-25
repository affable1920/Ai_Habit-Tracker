import React, { useContext, useState } from "react";
import Tooltip from "./Tooltip";
import TooltipContext from "../context/TooltipContext";
import { SlOptionsVertical } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { IoMdArchive } from "react-icons/io";
import { RiTimerFlashFill } from "react-icons/ri";

const HabitOptions = ({ habit }) => {
  const options = [
    {
      label: "edit",
      component: <CiEdit className="text-xs h-3 w-3" />,
    },
    {
      label: "timer",
      component: <RiTimerFlashFill />,
    },
    { label: "archive", component: <IoMdArchive className="h-3 w-3" /> },
  ];

  const { tooltip, dispatch } = useContext(TooltipContext);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div>
      <SlOptionsVertical
        onClick={() => setShowOptions(!showOptions)}
        onMouseEnter={() =>
          dispatch({ type: "options", tooltip: "View Options", id: habit.id })
        }
        onMouseLeave={() => {
          dispatch({ type: "clear" });
          // setTimeout(() => setShowOptions(false), 400);
        }}
        className="text-xs text-slate-400"
      />
      {tooltip?.id === habit.id && tooltip?.options && (
        <Tooltip tagline={tooltip?.options} />
      )}
      {showOptions && (
        <ul className="options">
          {options.map((option) => (
            <li
              className="cp p-2 hover:bg-slate-700 w-full text-slate-200 hover:text-white rounded-sm 
              transition-colors"
              key={option.label}
            >
              {option.component}
            </li>
          ))}
          {tooltip.option && habit.id === tooltip.id && (
            <Tooltip tagline={tooltip.option} />
          )}
        </ul>
      )}
    </div>
  );
};

export default HabitOptions;
