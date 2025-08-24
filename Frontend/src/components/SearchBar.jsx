import Button from "./Button";
import { IoIosClose } from "react-icons/io";
import useAuthStore from "../stores/authStore";
import useQueryStore from "../stores/queryStore";
import useHabitStore from "../stores/habitStore";

const SearchBar = () => {
  const user = useAuthStore((s) => s.user);

  const searchQuery = useQueryStore((s) => s.query?.searchQuery);
  const setSearchQuery = useQueryStore((s) => s.setSearchQuery);

  const habits = useHabitStore((s) => s.habits);
  const searchBarDisabled = !user || Array.isArray(habits)?.length === 0;

  return (
    <div className="relative flex">
      <input
        className="input pr-4 placeholder:font-black placeholder:text-sm py-1"
        name="searchQuery"
        value={searchQuery}
        placeholder={"Search ..."}
        disabled={searchBarDisabled}
        onChange={(e) => setSearchQuery(e.target?.value)}
      />
      {searchQuery && (
        <Button
          className="absolute right-1 bg-transparent 
          shadow-none border-0 top-1/2 -translate-y-1/2 hover:bg-transparent 
          hover:scale-125"
          onClick={() => setSearchQuery("")}
        >
          <IoIosClose />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
