import React, { useContext, useEffect } from "react";
import Habit from "./Habit";
import { IoMdAdd } from "react-icons/io";
import useHabitStore from "./habitStore";
import AuthContext from "../context/AuthContext";
import queryStore from "./../stores/queryStore";

const HabitsList = () => {
  const habits = useHabitStore((store) => store.habits);
  const fetchHabits = useHabitStore((store) => store.fetchHabits);
  const { user } = useContext(AuthContext);
  const { query } = queryStore();

  useEffect(() => {
    if (user) fetchHabits(user?.uid, query);
  }, [user?.uid, query]);

  return (
    <>
      <section className="mt-2 table h-full relative">
        {habits?.length === 0 && (
          <div className="flex items-center flex-col">
            <p className="text-sm font-bold text-red-600 tracking-wider font-mono">
              No Habits added yet
            </p>
            <IoMdAdd className="icon__with__bg animate__scale cp" />
          </div>
        )}
        {Array.isArray(habits) &&
          habits.map((habit) => <Habit habit={habit} />)}
      </section>
    </>
  );
};

export default HabitsList;
