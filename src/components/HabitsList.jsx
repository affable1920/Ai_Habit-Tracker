import React, { useContext } from "react";
import Habit from "./Habit";
import useHabits from "../hooks/useHabits";
import Skeleton from "./Skeleton";
import { IoMdAdd } from "react-icons/io";
import { ModalContext } from "./Providers/ModalProvider";

const HabitsList = () => {
  const { dispatch } = useContext(ModalContext);
  const { data, isLoading, isError, refetch } = useHabits();

  return (
    <>
      <section className="mt-2 table h-full relative">
        {isLoading && <Skeleton />}
        {data?.habits.length === 0 && (
          <div className="flex items-center flex-col">
            <p className="text-sm font-bold text-red-600 tracking-wider font-mono">
              No Habits added yet
            </p>
            {/* <IoMdAdd
              className="icon__with__bg animate__scale cp"
              onClick={() => dispatch({ type: "OPEN_MODAL", name: "addModal" })}
            /> */}
          </div>
        )}
        {isError && (
          <div className="flex justify-center">
            <button className="btn btn__accent text-xs" onClick={refetch}>
              Fetch again
            </button>
          </div>
        )}
        {data?.habits?.map((habit) => (
          <Habit habit={habit} />
        ))}
      </section>
    </>
  );
};

export default HabitsList;
