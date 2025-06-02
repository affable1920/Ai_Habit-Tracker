import Icon from "./Icon";
import queryStore from "../stores/queryStore";
import { LuListTodo } from "react-icons/lu";
import { MdPendingActions } from "react-icons/md";

const StatusFilter = () => {
  const query = queryStore((s) => s.query);
  const setStatus = queryStore((s) => s.setStatus);

  const handleSetStatus = () => {
    setStatus(query.status ? false : true);
  };

  return (
    <>
      <Icon
        fn={handleSetStatus}
        bg={true}
        Icon={query.status ? MdPendingActions : LuListTodo}
      />
    </>
  );
};

export default StatusFilter;
