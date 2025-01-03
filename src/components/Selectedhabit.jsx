import React from "react";
import { PiDotsNineThin } from "react-icons/pi";

const Selectedhabit = ({ onClick, habit }) => {
  return (
    <article
      onClick={onClick}
      className="border-[1px] border-slate-300 p-2 hover:bg-slate-300 bg-slate-200 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-[8px]">
        <PiDotsNineThin className="cursor-grab" />
        <h6 className="text-sm tracking-normal leading-tight font-medium opacity-80">
          {habit.habit_name}
        </h6>
      </div>
    </article>
  );
};

export default Selectedhabit;
