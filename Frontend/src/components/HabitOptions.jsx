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
    {
      label: "timer",
      component: <RiTimerFlashFill />,
    },
    {
      label: "timer",
      component: <RiTimerFlashFill />,
    },
  ];

  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative">
      <SlOptionsVertical
        onClick={() => setShowOptions(!showOptions)}
        className="icon icon__small"
      />
      {/* {showOptions && (
        <ul className="absolute">
          {options.map((option) => (
            <li key={option.label}>{option.component}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default HabitOptions;
