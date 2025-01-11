import React, { useState, useContext } from "react";
import Habit from "./Habit";
import AuthContext from "../context/AuthContext";
import Spinner from "./Spinner";
import NoAuthAndHabits from "./NoAuth&Habits";
import AuthButNoHabits from "./AuthButNoHabits";
import useHabits from "../hooks/useHabits";

const HabitsList = () => {
  const { user } = useContext(AuthContext);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const { data: habits = [], isLoading } = useHabits();

  const noAuthAndHabits = !user && habits?.length === 0 && !isLoading;
  const authButNoHabits = user && habits?.length === 0 && !isLoading;

  const handleSelect = (habit) => {
    const ifSelected = !!selectedHabits.find((h) => h.id === habit.id);
    setSelectedHabits(
      ifSelected
        ? selectedHabits.filter((h) => h.id !== habit.id)
        : [...selectedHabits, habit]
    );
  };

  return (
    <>
      {selectedHabits.length !== 0 && (
        <div className="flex items-center gap-2 justify-end">
          <button className="btn btn__accent text-xs">
            Mark as completed!
          </button>
          <button
            onClick={() => setSelectedHabits([])}
            className="btn btn__accent text-xs"
          >
            Select all Tasks
          </button>
          <span className="bg-slate-700 mt-5 rounded-md font-bold font-mono px-2 text-xs py-1">
            {selectedHabits.length}
          </span>
        </div>
      )}
      <section className="mt-2 table">
        {isLoading && <Spinner />}
        {noAuthAndHabits && <NoAuthAndHabits />}
        {authButNoHabits && <AuthButNoHabits />}
        {habits?.map((habit) => (
          <Habit
            key={habit?.habit_id}
            onSelect={handleSelect}
            selectedHabits={selectedHabits}
            habit={habit}
          />
        ))}
      </section>
    </>
  );
};

export default HabitsList;
