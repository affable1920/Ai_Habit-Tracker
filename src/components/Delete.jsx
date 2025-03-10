import React, { useContext } from "react";
import { ModalContext } from "./Providers/ModalProvider";
import useMutateHabit from "../hooks/useMutateHabit";

const Delete = () => {
  const { modal, dispatch } = useContext(ModalContext);
  const { mutate } = useMutateHabit();

  return (
    <div
      className=" p-3 rounded-lg mt-2 font-medium 
          tracking-wider italic bg-white shadow-xl text-black border-2 border-slate-100 
          dark:bg-secondary__lighter dark:text-zinc-300 dark:border-zinc-700 dark:shadow-2xl"
    >
      <p>Confirm habit deletion ?</p>
      <div className="flex justify-around mt-4">
        <button
          className="btn btn__accent"
          onClick={() => dispatch({ type: "CLOSE_MODAL" })}
        >
          Cancel
        </button>
        <button
          className="btn btn__accent"
          onClick={() => {
            mutate({
              action: "delete",
              habitId: modal.props.id,
            });
            dispatch({ type: "CLOSE_MODAL" });
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Delete;
