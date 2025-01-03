import React, { useState } from "react";
import Habit from "./Habit";
import useDataFilters from "../hooks/useDataFilters";

const HabitsList = () => {
  const { paginatedHabits } = useDataFilters();
  const [selectedHabits, setSelectedHabits] = useState([]);

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
            onClick={() => setSelectedHabits(paginatedHabits)}
            className="btn btn__accent text-xs"
          >
            Select all Tasks
          </button>
          <span className="bg-gray-600 text-white mt-3 rounded-md font-bold px-2 text-xs py-1">
            {selectedHabits.length}
          </span>
        </div>
      )}
      <section className="mt-2 table">
        {paginatedHabits.map((habit) => (
          <Habit
            key={habit.habit_id}
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
