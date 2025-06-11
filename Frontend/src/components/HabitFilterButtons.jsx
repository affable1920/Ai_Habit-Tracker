import { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import { RiResetLeftFill } from "react-icons/ri";
import { MdArchive, MdGifBox } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import queryStore from "../stores/queryStore";
import IconComponent from "./IconComponent";

const HabitFilterButtons = () => {
  const { user } = useContext(AuthContext);
  const reset = queryStore((s) => s.reset);
  const query = queryStore((s) => s.query);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 w-full justify-start">
        <Link to="/add">
          <button className="btn btn__primary">Add</button>
        </Link>
        <SearchBar />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Link to="/archived">
            <IconComponent Icon={MdArchive} bg />
          </Link>
        </div>
        <StatusFilter />
        <div className="flex items-center gap-1">
          <IconComponent
            Icon={RiResetLeftFill}
            bg
            fn={() => reset(query.max)}
          />
        </div>
      </div>
    </div>
  );
};

export default HabitFilterButtons;
