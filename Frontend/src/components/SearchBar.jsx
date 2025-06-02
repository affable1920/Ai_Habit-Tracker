import { useContext } from "react";
import { IoIosClose } from "react-icons/io";
import AuthContext from "../context/AuthContext";
import queryStore from "../stores/queryStore";
import useHabitStore from "../stores/habitStore";
import { debounce } from "../Utils/utils";

const SearchBar = () => {
  const { user } = useContext(AuthContext);
  const query = queryStore((s) => s.query);
  const setSearchQuery = queryStore((s) => s.setSearchQuery);

  const habits = useHabitStore((s) => s.habits);
  let setSearch_Query = debounce(setSearchQuery, 100);

  return (
    <div className={`inline-flex items-center relative justify-between`}>
      <input
        onChange={(e) => setSearch_Query(e.target.value)}
        disabled={!user || (!query.search_query && habits.length) === 0}
        placeholder={user ? "Search for a habit!" : "Login you MORON!"}
        className="input"
        value={query.search_query}
      />
      <div className="flex items-center absolute right-0 mr-2">
        {query.search_query && (
          <IoIosClose
            className="font-bold text-md cp"
            onClick={() => setSearch_Query("")}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
