import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { PiDotsNineThin } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import Tooltip from "./Tooltip";

const Habit = ({ habit, onMouseEnter, onMouseLeave, tooltipTagline }) => {
  const [loadMore, setLoadMore] = useState(false);
  const iconMap = {};

  return (
    <article className="border-[1px] border-slate-300 p-2 hover:bg-slate-100 cursor-pointer transition-colors">
      <header className="flex items-center justify-between gap-2 ">
        <div className="flex items-center gap-[8px]">
          <PiDotsNineThin className="cursor-grab" />
          <h6 className="text-sm tracking-tight"> {habit.habit_name} </h6>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`${
              habit.habit_completed ? "bg-color__light__shadow" : "bg-red-100"
            } rounded-md px-3 py-1 text-xs tracking-tight font-semibold`}
          >
            {habit.habit_completed ? "Done" : "Yet to be Done"}
          </span>
          <span className="text-xs bg-red-100 py-1 px-2 rounded-lg font-black tracking-wide">
            {habit.habit_frequency}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IoMdArrowDropdown
            className="cursor-pointer"
            onClick={() => setLoadMore(!loadMore)}
          />
          <div className={`${tooltipTagline && "tooltip__container"}`}>
            <MdDelete
              className="cp"
              onMouseEnter={() => onMouseEnter("delete")}
              onMouseLeave={onMouseLeave}
            />
            <Tooltip tagline={tooltipTagline} />
          </div>
          <HiDotsVertical className="cursor-pointer" />
        </div>
      </header>
      <div
        className={`habit_body flex items-center justify-between text-sm ${
          loadMore ? "" : "hidden"
        }`}
      >
        <p className="ml-7 tracking-wide">
          {habit.habit_description?.substring(0, 50)}
        </p>
        <span className="tracking-wide text-xs font-font_eng">
          Habit start_date: {habit.habit_start_date}
        </span>
      </div>
    </article>
  );
};

export default Habit;
