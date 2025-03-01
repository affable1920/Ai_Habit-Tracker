import React, { useContext } from "react";
import Tooltip from "./Tooltip";
import TooltipContext from "../context/TooltipContext";
import { ModalContext } from "./Providers/ModalProvider";
import { IoMdArrowDropdown } from "react-icons/io";
import HabitOptions from "./HabitOptions";
import { MdDelete } from "react-icons/md";

const HabitButtons = ({ onDropdownClick, habit }) => {
  const { tooltip } = useContext(TooltipContext);
  const { dispatch } = useContext(ModalContext);

  return (
    <div className="flex items-center gap-1 relative">
      <IoMdArrowDropdown className="icon" onClick={onDropdownClick} />
      <div className={`${"tooltip__container"}`}>
        {habit.id === tooltip?.id && tooltip?.delete && (
          <Tooltip tagline={tooltip?.delete} />
        )}
        <MdDelete
          onClick={() =>
            dispatch({
              type: "OPEN_MODAL",
              modalToShow: "deleteModal",
              props: { id: habit.id },
            })
          }
          className="icon__with__bg"
        />
      </div>
      <HabitOptions habit={habit} />
    </div>
  );
};

export default HabitButtons;
