import { useContext } from "react";
import HabitsContext from "../context/HabitsContext";
import QueryContext from "../context/QueryContext";

const paginate = (currentPage, pageSize, data) => {
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = startIndex + pageSize;

  return data.slice(startIndex, endIndex);
};

const useDataFilters = () => {
  const { habits } = useContext(HabitsContext);
  const { query } = useContext(QueryContext);

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

  return { paginatedHabits: paginated, habitsCount: habits.length };
};

export default useDataFilters;
