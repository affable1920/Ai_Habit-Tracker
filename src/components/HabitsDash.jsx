import React, { useContext, useState } from "react";
import habitsData from "../data/mockData.json";
import paginate from "../services/paginate";
import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import HabitFilterButtons from "./HabitFilterButtons";
import QueryContext from "../context/QueryContext";

const HabitsDash = () => {
  const { query } = useContext(QueryContext);
  const [habits] = useState(
    Object.entries(habitsData).map(([id, habit]) => ({
      id,
      ...habit,
    }))
  );

  let searchedHabits = habits;
  searchedHabits = !!query.searchQuery
    ? habits.filter(({ habit_name: name }) =>
        name
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase()
          .includes(
            query.searchQuery.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
          )
      )
    : habits;

  const paginated = paginate(query.currentPage, query.pageSize, searchedHabits);

  return (
    <>
      <h1 className="font-black mt-2 md:mt-3 text-center tracking-wide text-2xl text-color__primary">
        Habits Dashboard
      </h1>
      <div className="p-3 grid xl:grid-cols-2 px-10 mt-6">
        <div className="flex flex-col justify-center border-[2px] border-slate-300 rounded-md p-4 shadow-xl">
          <HabitFilterButtons />
          <HabitsList paginated={paginated} />
          <Pagination paginated={paginated} />
        </div>
      </div>
    </>
  );
};

export default HabitsDash;
