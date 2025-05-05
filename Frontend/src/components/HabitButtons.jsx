import React, { useContext } from "react";
import { ModalContext } from "./Providers/ModalProvider";
import { IoMdArrowDropdown } from "react-icons/io";
import HabitOptions from "./HabitOptions";
import { MdDelete } from "react-icons/md";
import { RiCollapseHorizontalFill } from "react-icons/ri";

const HabitButtons = ({ onDropdownClick, habit }) => {
  const { dispatch } = useContext(ModalContext);

  const onExtra = () => {
    dispatch({
      type: "OPEN_MODAL",
      name: "habitDetails",
      props: { habit },
    });
  };

  return (
    <div className="flex items-center gap-2 relative">
      <RiCollapseHorizontalFill className="icon__with__bg" onClick={onExtra} />
      <IoMdArrowDropdown className="icon__with__bg" onClick={onDropdownClick} />
      <MdDelete
        onClick={() =>
          dispatch({
            type: "OPEN_MODAL",
            name: "deleteModal",
            props: { habitId: habit.id },
          })
        }
        className="icon__with__bg"
      />
      <HabitOptions habit={habit} />
    </div>
  );
};

export default HabitButtons;
