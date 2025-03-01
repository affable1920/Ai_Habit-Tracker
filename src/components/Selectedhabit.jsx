import React from "react";
import { PiDotsNineThin } from "react-icons/pi";

const Selectedhabit = ({ onClick, habit }) => {
  return (
    <article
      key={habit.id}
      onClick={onClick}
      className="habit bg-slate-200 dark:bg-slate-800"
    >
      <div className="flex items-center gap-[8px]">
        <PiDotsNineThin className="cursor-grab" />
        <h6 className="habit__title">{habit.title}</h6>
      </div>
    </article>
  );
};

export default Selectedhabit;
