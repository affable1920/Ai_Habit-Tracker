import React from "react";
import Button from "./Button";
import { IoIosClose } from "react-icons/io";
import useAuthStore from "../stores/authStore";
import useQueryStore from "../stores/queryStore";
import useHabitStore from "../stores/habitStore";
import { debounce } from "../utilityFns/utils";

const SearchBar = () => {
  const user = useAuthStore((s) => s.user);

  let setSearchQuery = useQueryStore((s) => s.setSearchQuery);
  const searchQuery = useQueryStore((s) => s.query?.searchQuery);

  const habits = useHabitStore((s) => s.habits);
  const searchBarDisabled = !user || Array.isArray(habits)?.length === 0;

  // Seperate state to update search query locally for optmistic ui/ux experience.
  const [localSearch, setLocalSearch] = React.useState("");

  // Use this for individual debounce state
  const cachedSQSetter = React.useMemo(
    () => debounce(setSearchQuery, 150, { leading: true }),
    []
  );

  const handleSearch = ({ target: { value: searchText = "" } = {} } = {}) => {
    setLocalSearch(searchText);

    // Use the cached fn
    cachedSQSetter(searchText);
  };

  const resetSearch = () => {
    setLocalSearch("");

    // Regular store fn for quick reset.
    setSearchQuery("");
  };

  return (
    <div className="relative flex">
      <input
        className="input pr-4 placeholder:font-black placeholder:text-sm py-1"
        name="searchQuery"
        value={localSearch}
        onChange={handleSearch}
        placeholder={"Search ..."}
        disabled={searchBarDisabled}
      />
      {searchQuery && (
        <Button
          className="absolute right-1 bg-transparent 
          shadow-none border-0 top-1/2 -translate-y-1/2 hover:bg-transparent 
          hover:scale-125"
          onClick={resetSearch}
        >
          <IoIosClose />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
