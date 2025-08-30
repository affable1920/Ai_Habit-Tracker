import Button from "./Interactives/Button.js";
import { LuListTodo } from "react-icons/lu";
import useQueryStore from "../stores/queryStore.js";
import { MdPendingActions } from "react-icons/md";

const StatusFilter = () => {
  const status = useQueryStore((s) => s.query?.status) || null;
  const setStatus = useQueryStore((s) => s.setStatus);

  const onSetStatus = () => {
    const currStatus = status;
    const nextStatus = !currStatus
      ? "completed"
      : currStatus === "completed"
      ? "incomplete"
      : "completed";
    setStatus(nextStatus);
  };

  return (
    <Button onClick={onSetStatus}>
      {status === "completed" ? <MdPendingActions /> : <LuListTodo />}
    </Button>
  );
};

export default StatusFilter;
