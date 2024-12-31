import React, { useContext } from "react";
import QueryContext from "../context/QueryContext";
import { IoIosClose } from "react-icons/io";

const SearchBar = () => {
  const { query, dispatch: queryDispatch } = useContext(QueryContext);

  return (
    <div className="inline-flex items-center relative justify-between">
      <input
        onChange={(e) => {
          queryDispatch({
            type: "set_searchQuery",
            searchQuery: e.target.value,
            currentPage: 1,
          });
        }}
        value={query.searchQuery}
        placeholder="Search for a habit!"
        className="px-4 py-2 rounded-md transition-colors placeholder:text-xs tracking-wide bg-slate-50 ring-1 ring-slate-300
     font-semibold text-sm outline-none hover:focus:bg-slate-100"
      />
      <div className="flex items-center absolute right-0 mr-2">
        {!!query.searchQuery ? (
          <IoIosClose
            className="cursor-pointer"
            onClick={() =>
              queryDispatch({
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
