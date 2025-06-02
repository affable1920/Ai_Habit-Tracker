import { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import { RiResetLeftFill } from "react-icons/ri";
import { MdArchive } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import queryStore from "../stores/queryStore";
import Icon from "./Icon";

const HabitFilterButtons = () => {
  const { user } = useContext(AuthContext);
  const reset = queryStore((s) => s.reset);
  const query = queryStore((s) => s.query);

  return (
    <div className="flex items-center justify-between box">
      <div className="flex items-center gap-2 w-full justify-start">
        {(user || (user && data?.habits.length !== 0)) && (
          <button className="btn btn__primary">
            <Link to="/add">Add</Link>
          </button>
        )}
        <SearchBar />
      </div>

      {/* Query Icons */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Link to="/archived">
            <Icon
              Icon={MdArchive}
              bg={true}
              // onMouseEnter={() =>
              //   show({ msg: "View Archived", element: ".archive" })
              // }
              // onMouseLeave={hide}
            />
          </Link>
        </div>
        <StatusFilter />
        <div className="flex items-center gap-1">
          <Icon
            Icon={RiResetLeftFill}
            bg={true}
            fn={() => reset(query.max)}
            // onMouseEnter={() =>
            //   show({ msg: "Reset queries", element: ".reset" })
            // }
            // onMouseLeave={hide}
          />
        </div>
      </div>
    </div>
  );
};

export default HabitFilterButtons;
