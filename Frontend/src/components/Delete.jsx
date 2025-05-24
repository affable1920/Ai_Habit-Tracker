import React, { useContext } from "react";
import { ModalContext } from "./Providers/ModalProvider";
import useHabitStore from "../stores/habitStore";
import { toast } from "sonner";

const Delete = () => {
  const { modal, dispatch } = useContext(ModalContext);
  const deleteHabit = useHabitStore((s) => s.deleteHabit);

  const onDelete = async () => {
    const { success, msg } = await deleteHabit(modal.props?.habitId);

    if (!success) {
      toast.error(msg);
      return;
    }

    toast.success(msg);
    dispatch({ type: "CLOSE_MODAL", name: "deleteModal" });
  };

  return (
    <div
      className=" p-3 rounded-lg mt-2 font-medium 
          tracking-wider italic bg-white shadow-xl text-black border-2 border-slate-100 
          dark:bg-secondary__lighter dark:text-zinc-300 dark:border-zinc-700 dark:shadow-2xl"
    >
      <p>Confirm habit deletion ?</p>
      <div className="flex justify-around mt-4">
        <button
          onClick={() => dispatch({ type: "CLOSE_MODAL", name: "deleteModal" })}
          className="btn btn__accent"
        >
          Cancel
        </button>
        <button onClick={onDelete} className="btn btn__accent">
          Yes
        </button>
      </div>
    </div>
  );
};

export default Delete;
