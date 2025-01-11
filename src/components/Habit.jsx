import React, { useState, useRef } from "react";
import HabitButtons from "./HabitButtons";
import Selectedhabit from "./Selectedhabit";
import { PiDotsNineThin } from "react-icons/pi";
import getStreakTitle, { streakMap } from "../Utils/getHabitStreak";

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

  const ifSelected = !!selectedHabits.find((h) => h.id === habit.id) || false;
  const streakType = getStreakTitle(habit.streak);

  return ifSelected ? (
    <Selectedhabit onClick={() => onSelect(habit)} habit={habit} />
  ) : (
    <article className="habit">
      <header
        onMouseDown={handleMouseDown}
        onMouseUp={() => (holdRef.current = false)}
        onMouseLeave={() => (holdRef.current = false)}
        className="flex items-center justify-between gap-2 "
      >
        <div className="flex items-center gap-[8px]">
          <PiDotsNineThin className="icon hover:cursor-grab" />
          <h6 className="habit__title">{habit.title}</h6>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-md text-xs mr-2 tracking-normal bg-slate-100 p-[4px] font-medium
               dark:bg-color__fill border-[1px] border-slate-300 dark:border-slate-700`}
          >
            {habit.status}
          </span>
          <span className="text-xs py-1 px-2 rounded-lg font-black tracking-wide capitalize">
            {habit.frequency?.type}
          </span>
        </div>
        <HabitButtons
          onDropdownClick={() => setLoadMore(!loadMore)}
          habit={habit}
        />
      </header>
      <div
        className={`habit_body pt-2 flex justify-between items-center text-sm ${
          loadMore ? "" : "hidden"
        }`}
      >
        <p className="text-xs ml-5 md:ml-6 font-mono tracking-tight">
          {habit?.description}
        </p>
        <span className="tracking-wide text-xs font-mono">
          Streak:
          <span
            className={`${streakMap[streakType]} rounded-lg p-1 ml-2 py-[2px] text-white`}
          >
            {habit.streak}
          </span>
        </span>
      </div>
    </article>
  );
};

export default Habit;
