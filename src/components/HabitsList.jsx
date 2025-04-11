import React from "react";
import Habit from "./Habit";
import useHabits from "../hooks/useHabits";
import { IoMdAdd } from "react-icons/io";

const HabitsList = () => {
  const { habits = [], error } = useHabits();

  if (error)
    return (
      <div className="flex items-center flex-col mt-2">
        <p className=" text-sm font-bold text-red-600 tracking-wider font-mono">
          {error}
        </p>
      </div>
    );

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
        {habits?.map((habit) => (
          <Habit habit={habit} />
        ))}
      </section>
    </>
  );
};

export default HabitsList;
