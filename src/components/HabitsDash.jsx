import React from "react";
import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import HabitFilterButtons from "./HabitFilterButtons";

const HabitsDash = () => {
  return (
    <>
      <header>
        <h1 className="font-black mt-2 md:mt-3 text-center tracking-wide text-2xl text-color__primary">
          Habits Dashboard
        </h1>
      </header>
      <section className="p-3 grid xl:grid-cols-2 px-10 mt-6">
        <div className="flex flex-col justify-center border-[2px] border-slate-300 rounded-md p-4 shadow-xl">
          <HabitFilterButtons />
          <HabitsList />
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default HabitsDash;
