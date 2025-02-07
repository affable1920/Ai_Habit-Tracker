import React from "react";
import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import HabitFilterButtons from "./HabitFilterButtons";

const HabitsTracker = () => {
  return (
    <div>
      <header>
        <h1 className="headings__large text-center mt-2 md:mt-3 mb-3 ">
          Dashboard
        </h1>
      </header>
      <section
        className="flex flex-col rounded-md p-4 dark:gradient__primary 
        border-[1px] border-slate-300 shadow-xl dark:shadow-black dark:border-slate-700"
      >
        <HabitFilterButtons />
        <HabitsList />
        <Pagination />
      </section>
    </div>
  );
};

export default HabitsTracker;
