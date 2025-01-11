import React, { useContext } from "react";
import QueryContext from "../context/QueryContext";
import { IoIosClose } from "react-icons/io";

const SearchBar = () => {
  const { query, dispatch } = useContext(QueryContext);

  return (
    <div className="inline-flex items-center relative justify-between">
      <input
        onChange={(e) => {
          dispatch({
            type: "set_searchQuery",
            searchQuery: e.target.value,
          });
        }}
        value={query.searchQuery}
        placeholder="Search for a habit!"
        className="input__secondary"
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
