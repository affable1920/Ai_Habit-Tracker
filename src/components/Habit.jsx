import React, { useState, useRef } from "react";
import HabitButtons from "./HabitButtons";
import { PiDotsNineThin } from "react-icons/pi";
import Selectedhabit from "./Selectedhabit";

const Habit = ({ habit, onSelect, selectedHabits }) => {
  const [loadMore, setLoadMore] = useState(false);
  const THRESHOLD__TIME = 750;

  let holdRef = useRef(false);

  const handleMouseDown = () => {
    if (selectedHabits.length !== 0) onSelect(habit);
    holdRef.current = true;

    setTimeout(() => {
      if (holdRef.current) onSelect(habit);
    }, THRESHOLD__TIME);
  };

  const ifSelected = !!selectedHabits.find((h) => h.id === habit.id);

  return ifSelected ? (
    <Selectedhabit onClick={() => onSelect(habit)} habit={habit} />
  ) : (
    <article
      onMouseDown={handleMouseDown}
      onMouseUp={() => (holdRef.current = false)}
      onMouseLeave={() => (holdRef.current = false)}
      className="border-[1px] border-slate-300 p-2 hover:bg-slate-100 cursor-pointer transition-colors"
    >
      <header className="flex items-center justify-between gap-2 ">
        <div className="flex items-center gap-[8px]">
          <PiDotsNineThin className="cursor-grab" />
          <h6 className="text-sm tracking-normal leading-tight font-medium">
            {habit.habit_name}
          </h6>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`${
              habit.habit_completed ? "bg-color__light__shadow" : "bg-red-100"
            } rounded-md px-3 py-1 text-xs tracking-tight font-semibold leading-[1.1]`}
          >
            {habit.habit_completed ? "Done" : "Yet to be Done"}
          </span>
          <span className="text-xs bg-red-100 py-1 px-2 rounded-lg font-black tracking-wide">
            {habit.habit_frequency}
          </span>
        </div>
        <HabitButtons
          onDropdownClick={() => setLoadMore(!loadMore)}
          habit={habit}
        />
      </header>
      <div
        className={`habit_body flex items-center justify-between text-sm ${
          loadMore ? "" : "hidden"
        }`}
      >
        <p className=" text-xs tracking-wide ml-5 md:ml-6">
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
