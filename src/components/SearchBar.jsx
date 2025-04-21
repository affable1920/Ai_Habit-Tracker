import React, { useContext } from "react";
import { IoIosClose } from "react-icons/io";
import AuthContext from "../context/AuthContext";
import queryStore from "../stores/queryStore";

const SearchBar = () => {
  const { user } = useContext(AuthContext);
  const { query, setSearchQuery } = queryStore();

  return (
    <div className="inline-flex items-center relative justify-between">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        // disabled={!user || data?.habits?.length === 0}
        placeholder={user ? "Search for a habit!" : "Login you MORON!"}
        className="search__bar"
        value={query.search_query}
      />
      <div className="flex items-center absolute right-0 mr-2">
        {query.search_query && (
          <IoIosClose className="icon" onClick={() => setSearchQuery("")} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
