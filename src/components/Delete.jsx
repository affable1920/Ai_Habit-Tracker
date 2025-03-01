import React, { useContext } from "react";
import { ModalContext } from "./Providers/ModalProvider";
import useMutateHabit from "../hooks/useMutateHabit";

const Delete = () => {
  const { modal, dispatch } = useContext(ModalContext);
  const { mutate } = useMutateHabit();
  return (
    <div
      className="bg-color__accent__lighter/55 dark:bg-slate-300 text-black p-3 rounded-lg mt-2 font-medium 
          tracking-wide"
    >
      <p>Confirm habit deletion ?</p>
      <div className="flex justify-around mt-4">
        <button
          className="btn btn__primary"
          onClick={() => dispatch({ type: "CLOSE_MODAL" })}
        >
          Cancel
        </button>
        <button
          className="btn btn__primary"
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
