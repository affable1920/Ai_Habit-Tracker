import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdStart } from "react-icons/md";
import Habit from "./Habit";
import useHabitStore from "../stores/habitStore";
import queryStore from "./../stores/queryStore";
import IconComponent from "./IconComponent";

const HabitsList = () => {
  const habits = useHabitStore((store) => store.habits);
  const fetchHabits = useHabitStore((store) => store.fetchHabits);

  const query = queryStore((s) => s.query);
  const search_query = queryStore((s) => s.search_query);

  useEffect(() => {
    fetchHabits(query);
  }, [query]);

  const resizeCallback = () => {};
  const ro = new ResizeObserver(resizeCallback);

  useEffect(() => {}, []);

  return (
    <section className={`flex gap-2 flex-col`}>
      {habits?.length === 0 && (
        <div className="flex items-center flex-col gap-2">
          <p className="text-sm font-bold font-mono tracking-widest mt-4">
            {search_query ? "No such habits found !" : "No Habits added yet"}
          </p>
          {!search_query && (
            <Link to="/add">
              <IconComponent Icon={MdStart} bg />
            </Link>
          )}
        </div>
      )}

      {Array.isArray(habits) &&
        habits.map((habit) => <Habit habit={habit} key={habit.id} />)}
    </section>
  );
};

export default HabitsList;
