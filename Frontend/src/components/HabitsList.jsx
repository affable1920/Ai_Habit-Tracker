import React from "react";
import Habit from "./Habit";
import useHabitStore from "../stores/habitStore";
import useQueryStore from "./../stores/queryStore";

const HabitsList = () => {
  const query = useQueryStore((s) => s.query);

  const habits = useHabitStore((store) => store.habits);
  const fetchHabits = useHabitStore((store) => store.fetchHabits);

  React.useEffect(() => {
    const getHabits = async () => {
      try {
        await fetchHabits(query);
      } catch (ex) {
      } finally {
      }
    };

    getHabits();
  }, [query, fetchHabits]);

  const noHabits = !Array.isArray(habits) || habits.length === 0;
  return (
    <section className={` gap-2`}>
      {noHabits ? (
        <div className="text-error text-red-800 py-4 font-semibold text-shadow-2xs text-sm">
          {query?.searchQuery
            ? "No matching habits found !"
            : "No habits yet. Start Adding today !"}
        </div>
      ) : (
        habits.map((habit) => <Habit habit={habit} key={habit.id} />)
      )}
    </section>
  );
};

export default HabitsList;
