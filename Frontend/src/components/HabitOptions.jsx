import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { IoMdArchive } from "react-icons/io";
import { RiTimerFlashFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HabitOptions = ({ habit }) => {
  const navigate = useNavigate();
  const options = [
    {
      label: "timer",
      component: <RiTimerFlashFill />,
    },
  ];

  const [showOptions, setShowOptions] = useState(false);

  return (
    <div>
      <SlOptionsVertical
        onClick={() => setShowOptions(!showOptions)}
        className="text-xs text-slate-400 icon__with__bg"
      />
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
        </ul>
      )}
    </div>
  );
};

export default HabitOptions;
