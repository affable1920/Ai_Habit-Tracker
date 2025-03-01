import React, { useState, useRef, useContext } from "react";
import HabitButtons from "./HabitButtons";
import Selectedhabit from "./Selectedhabit";
import { PiDotsNineThin } from "react-icons/pi";
import getStreakTitle, { streakMap } from "../Utils/getHabitStreak";
import { GoChevronRight } from "react-icons/go";
import useUpdateHabit from "./../hooks/useUpdateHabit";
import { ModalContext } from "./Providers/ModalProvider";

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

  const { modal, dispatch } = useContext(ModalContext);
  const onEditStatusClick = () => {
    if (habit.status === "complete") return;
    dispatch({
      type: "OPEN_MODAL",
      modalToShow: "editHabitModal",
      props: { id: habit.id },
    });
  };

  return ifSelected ? (
    <Selectedhabit onClick={() => onSelect(habit)} habit={habit} />
  ) : (
    <>
      <article className="habit" key={habit.id}>
        <div>
          <article
            className={`text-[9px] font-medium tracking-widest text-black p-2 rounded-md shadow-sm justify-self-end mb-2 relative ${
              habit.status === "complete"
                ? "bg-color__accent__lighter"
                : "bg-yellow-400"
            }`}
          >
            <button
              onClick={onEditStatusClick}
              className="flex items-center gap-2"
            >
              {habit.status[0].toUpperCase() + habit.status.slice(1)}
              {
                <GoChevronRight
                  className={`font-bold ${
                    modal?.modalName === "editHabitModal" &&
                    modal.props.id === habit.id &&
                    "animate__arrow__spin"
                  } `}
                />
              }
            </button>
          </article>
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
