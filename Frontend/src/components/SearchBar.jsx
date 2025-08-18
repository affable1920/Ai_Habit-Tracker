import useAuthStore from "../stores/authStore";
import useQueryStore from "../stores/queryStore";
import useHabitStore from "../stores/habitStore";
import { IoIosClose } from "react-icons/io";
import Button from "./Button";

const SearchBar = () => {
  const user = useAuthStore((s) => s.user);

  const searchQuery = useQueryStore((s) => s.query?.searchQuery);
  const setSearchQuery = useQueryStore((s) => s.setSearchQuery);

  const habits = useHabitStore((s) => s.habits);
  const searchBarDisabled = !user || Array.isArray(habits)?.length === 0;

  return (
    <div className={`relative`}>
      <input
        className="input"
        value={searchQuery}
        placeholder={"Search"}
        disabled={searchBarDisabled}
        onChange={(e) => setSearchQuery(e.target?.value)}
      />
      {searchQuery && (
        <Button
          className="absolute translate-1/2 right-3.5"
          onClick={() => setSearchQuery("")}
        >
          <IoIosClose />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
