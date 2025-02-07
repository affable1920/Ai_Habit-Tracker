import React, { useState, useContext } from "react";
import Habit from "./Habit";
import AuthContext from "../context/AuthContext";
import Spinner from "./Spinner";
import NoAuthAndHabits from "./NoAuth&Habits";
import useHabits from "../hooks/useHabits";

const HabitsList = () => {
  const [selectedHabits, setSelectedHabits] = useState([]);
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError, refetch } = useHabits();

  const noAuth = !user && !data && !isLoading;
  const authButNoHabits = user && data?.habits?.length === 0 && !isLoading;

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
      <section className="mt-2 table h-full relative">
        {isLoading && <Spinner />}
        {noAuth && <NoAuthAndHabits />}
        {authButNoHabits && !isLoading && (
          <div className="text-s text-red-700 font-semibold font-mono text-center">
            No Habits .!
            {isError && (
              <button
                onClick={refetch}
                className="btn__primary px-5 py-1 rounded-md text-slate-100 ml-2"
              >
                Try Again !
              </button>
            )}
          </div>
        )}
        {data?.habits?.map((habit) => (
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
