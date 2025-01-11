import React, { useContext } from "react";
import TooltipContext from "../context/TooltipContext";
import { MdDelete } from "react-icons/md";

const DeleteIcon = ({ habitId }) => {
  const { dispatch } = useContext(TooltipContext);

  return (
    <MdDelete
      onClick={() => console.log("Deleted" + habitId)}
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
