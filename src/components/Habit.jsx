import React, { useState, useContext } from "react";
import HabitButtons from "./HabitButtons";
import { PiDotsNineThin } from "react-icons/pi";
import getStreakTitle, { streakMap } from "../Utils/getHabitStreak";
import { GoChevronRight } from "react-icons/go";
import { ModalContext } from "./Providers/ModalProvider";

const Habit = ({ habit }) => {
  const [loadMore, setLoadMore] = useState(false);

  const streakType = getStreakTitle(habit.streak);
  const { modal, dispatch } = useContext(ModalContext);

  const onEditStatusClick = () => {
    if (habit.completed) return;

    dispatch({
      type: "OPEN_MODAL",
      name: "editHabit",
      props: { id: habit.id, fieldsToUpdate: { completed: true } },
    });
  };

  return (
    <article className="habit" key={habit.id}>
      <div>
        <article
          className={`text-[9px] font-medium tracking-widest text-black p-2 rounded-md shadow-sm justify-self-end 
            mb-3 relative ${
              habit.completed ? "bg-green-400" : "bg-yellow-400"
            }`}
        >
          <button
            disabled={habit.completed}
            onClick={onEditStatusClick}
            className="flex items-center gap-2"
          >
            {habit.completed ? "complete" : "incomplete"}
            <GoChevronRight
              className={`font-bold ${
                modal?.modalName === "editHabit" &&
                modal.props.id === habit.id &&
                "animate__arrow__spin"
              } `}
            />
          </button>
        </article>
      </div>
      <header className="flex items-center justify-between gap-2 ">
        <div className="flex items-center gap-[8px]">
          <PiDotsNineThin className="icon hover:cursor-grab" />
          <h6 className="habit__title">
            {habit.title.charAt(0).toUpperCase() + habit.title.slice(1)}
          </h6>
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
  );
};

export default Habit;
