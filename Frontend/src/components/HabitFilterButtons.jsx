import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import { RiResetLeftFill } from "react-icons/ri";
import useQueryStore from "../stores/queryStore";
import Button from "./Button";

const HabitFilterButtons = () => {
  const reset = useQueryStore((s) => s.reset);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/add">
          <Button className="px-4 text-sm">Add</Button>
        </Link>
        <SearchBar />
      </div>

      <div className="flex items-center gap-2">
        <StatusFilter />
        <div className="flex items-center gap-1">
          <Button onClick={reset}>
            <RiResetLeftFill />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HabitFilterButtons;
