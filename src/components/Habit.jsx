import React, { useState, useRef } from "react";
import HabitButtons from "./HabitButtons";
import Selectedhabit from "./Selectedhabit";
import { PiDotsNineThin } from "react-icons/pi";
import getStreakTitle, { streakMap } from "../Utils/getHabitStreak";
import { GoChevronRight } from "react-icons/go";
import Modal from "./Modal";
import useUpdateHabit from "./../hooks/useUpdateHabit";

const Habit = ({ habit, onSelect, selectedHabits }) => {
  const [loadMore, setLoadMore] = useState(false);
  const THRESHOLD__TIME = 750;

  let holdRef = useRef(false);

  const [showEditBtn, setShowEditBtn] = useState(false);
  const handleMouseDown = () => {
    if (selectedHabits.length !== 0) onSelect(habit);
    holdRef.current = true;

    setTimeout(() => {
      if (holdRef.current) onSelect(habit);
    }, THRESHOLD__TIME);
  };

  const ifSelected = !!selectedHabits.find((h) => h.id === habit.id) || false;
  const streakType = getStreakTitle(habit.streak);

  const { mutate, isSuccess } = useUpdateHabit();
  return ifSelected ? (
    <Selectedhabit onClick={() => onSelect(habit)} habit={habit} />
  ) : (
    <>
      <article className="habit">
        <div>
          <article
            className={`text-[9px] z-10 font-medium tracking-widest text-black p-2 rounded-md justify-self-end mb-2 relative ${
              habit.status === "complete"
                ? "bg-color__accent__lighter"
                : "bg-yellow-400"
            }`}
          >
            <button
              onClick={() => setShowEditBtn(!showEditBtn)}
              className="flex items-center gap-2"
            >
              {habit.status[0].toUpperCase() + habit.status.slice(1)}
              <GoChevronRight className="font-bold" />
            </button>
          </article>
          {habit.status === "incomplete" && (
            <Modal open={showEditBtn} onClose={() => setShowEditBtn(false)}>
              <button
                onClick={() => mutate(habit.id)}
                className={`text-xs font-medium bg-color__accent__lighter p-2 rounded-md
                italic mt-4 shadow-md tracking-wider`}
              >
                Mark_complete
              </button>
            </Modal>
          )}
        </div>
        <header
          onMouseDown={handleMouseDown}
          onMouseUp={() => (holdRef.current = false)}
          onMouseLeave={() => (holdRef.current = false)}
          className="flex items-center justify-between gap-2 "
        >
          <div className="flex items-center gap-[8px]">
            <PiDotsNineThin className="icon hover:cursor-grab" />
            <h6 className="habit__title">
              {habit.title.charAt(0).toUpperCase() + habit.title.slice(1)}
            </h6>
          </div>
          <div className="flex items-center gap-2">
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
          <p className="text-xs ml-5 md:ml-6 font-mono tracking-tight leading-4">
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
    </>
  );
};

export default Habit;
