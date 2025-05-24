import Habit from "./Habit";
import { useEffect } from "react";
import useHabitStore from "../stores/habitStore";
import queryStore from "./../stores/queryStore";

const HabitsList = () => {
  const habits = useHabitStore((store) => store.habits);
  const fetchHabits = useHabitStore((store) => store.fetchHabits);

  const { query } = queryStore();

  useEffect(() => {
    fetchHabits(query);
  }, [query]);

  return (
    <>
      <section className="mt-2 table h-full relative">
        {habits?.length === 0 && (
          <div className="flex items-center flex-col">
            <p className="text-sm font-bold text-red-600 tracking-wider font-mono">
              No Habits added yet
            </p>
          </div>
        )}
        {Array.isArray(habits) &&
          habits.map((habit) => <Habit habit={habit} />)}
      </section>
    </>
  );
};

export default HabitsList;
