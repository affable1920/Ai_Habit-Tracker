import useQueryStore from "../stores/queryStore";
import { LuListTodo } from "react-icons/lu";
import { MdPendingActions } from "react-icons/md";
import Button from "./Button";

const StatusFilter = () => {
  const status = useQueryStore((s) => s.status);
  const setStatus = useQueryStore((s) => s.setStatus);

  return (
    <Button bg onClick={setStatus}>
      {status ? <MdPendingActions /> : <LuListTodo />}
    </Button>
  );
};

export default StatusFilter;
