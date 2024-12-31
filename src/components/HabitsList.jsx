import React from "react";
import Habit from "./Habit";

const HabitsList = ({ paginated }) => {
  return (
    <section className="mt-4 table">
      {paginated.map((habit) => (
        <Habit key={habit.habit_id} habit={habit} />
      ))}
    </section>
  );
};

export default HabitsList;
