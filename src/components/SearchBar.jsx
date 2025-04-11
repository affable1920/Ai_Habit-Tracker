import React, { useContext } from "react";
import { IoIosClose } from "react-icons/io";
import useHabits from "../hooks/useHabits";
import AuthContext from "../context/AuthContext";
import queryStore from "../stores/queryStore";

const SearchBar = () => {
  const { data = {} } = useHabits();

  const { user } = useContext(AuthContext);
  const { query, setSearchQuery } = queryStore();

  return (
    <div className="inline-flex items-center relative justify-between">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={!user || data?.habits?.length === 0}
        placeholder={user ? "Search for a habit!" : "Login you MORON!"}
        className="search__bar"
        value={query.searchQuery}
      />
      <div className="flex items-center absolute right-0 mr-2">
        {query.searchQuery && (
          <IoIosClose className="icon" onClick={() => setSearchQuery("")} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
