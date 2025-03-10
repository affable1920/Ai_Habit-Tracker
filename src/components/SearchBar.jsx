import React, { useContext } from "react";
import { IoIosClose } from "react-icons/io";
import useHabits from "../hooks/useHabits";
import { QueryContext } from "./Providers/QueryProvider";
import AuthContext from "../context/AuthContext";

const SearchBar = () => {
  const { query, dispatch } = useContext(QueryContext);
  const { data = {} } = useHabits();

  const { user } = useContext(AuthContext);

  return (
    <div className="inline-flex items-center relative justify-between">
      <input
        onChange={(e) => {
          dispatch({
            type: "set_searchQuery",
            searchQuery: e.target.value,
          });
        }}
        disabled={!user || data?.habits?.length === 0}
        value={query.searchQuery}
        placeholder={user ? "Search for a habit!" : "Login you MORON!"}
        className="rounded-md p-[6px] pl-3 text-xs placeholder:italic placeholder:opacity-80 tracking-wider
        border-2 border-slate-200 shadow-sm outline-0 focus:ring-1 focus:ring-orange-600 dark:bg-secondary__lighter
        dark:border-zinc-700 md:px-12"
      />
      <div className="flex items-center absolute right-0 mr-2">
        {!!query.searchQuery ? (
          <IoIosClose
            className="icon"
            onClick={() =>
              dispatch({
                type: "set_searchQuery",
                searchQuery: "",
                currentPage: 1,
              })
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
