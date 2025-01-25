import React, { useContext } from "react";
import TooltipContext from "../context/TooltipContext";
import { MdDelete } from "react-icons/md";
import useMutateHabit from "./../hooks/useMutateHabit";

const DeleteIcon = ({ habitId }) => {
  const { dispatch } = useContext(TooltipContext);
  const { mutate } = useMutateHabit();

  return (
    <MdDelete
      onClick={() => mutate({ action: "delete", habitId })}
      className="icon"
      onMouseEnter={() =>
        dispatch({
          type: "delete",
          tooltip: `Delete habit`,
          id: habitId,
        })
      }
      onMouseLeave={() => dispatch({ type: "clear" })}
    />
  );
};

export default DeleteIcon;
