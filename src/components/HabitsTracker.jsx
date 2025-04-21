import React from "react";
import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import HabitFilterButtons from "./HabitFilterButtons";
import AddHabitComponent from "./AddHabitComponent";

const HabitsTracker = () => {
  return (
    <>
      <section className="md:flex justify-around">
        <AddHabitComponent />
        <div className="h-full mx-8 my-4 rounded-md relative max-h-[80%]">
          <div>
            <header>
              <h1 className="headings__large text-center mt-2 md:mt-3 mb-3 ">
                Tracker
              </h1>
            </header>
            <section
              className="flex flex-col rounded-md p-4 dark:gradient__primary 
              border-[1px] border-slate-200 shadow-xl dark:shadow-black/50 dark:border-zinc-700"
            >
              <HabitFilterButtons />
              <HabitsList />
              <Pagination />
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default HabitsTracker;
