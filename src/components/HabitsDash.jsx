import React from "react";
import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import HabitFilterButtons from "./HabitFilterButtons";

const Dashboard = () => {
  return (
    <>
      <header>
        <h1 className="headings__large text-center mt-2 md:mt-3 ">Dashboard</h1>
      </header>
      <section className="p-3 grid xl:grid-cols-2 px-10 mt-6 md:grid md:grid-cols-2 gap-3 md:gap-6">
        <section
          className="flex flex-col justify-center rounded-md p-4 dark:gradient__primary 
        border-[1px] border-slate-300 shadow-xl dark:shadow-black dark:border-slate-700"
        >
          <HabitFilterButtons />
          <HabitsList />
          <Pagination />
        </section>
      </section>
    </>
  );
};

export default Dashboard;
