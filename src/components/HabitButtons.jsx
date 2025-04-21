import React, { useContext } from "react";
import { ModalContext } from "./Providers/ModalProvider";
import { IoMdArrowDropdown } from "react-icons/io";
import HabitOptions from "./HabitOptions";
import { MdArchive, MdDelete } from "react-icons/md";
import useUpdateHabit from "../hooks/useUpdateHabit";
import { toast } from "sonner";
import useMutateHabit from "../hooks/useMutateHabit";

const HabitButtons = ({ onDropdownClick, habit }) => {
  const { dispatch } = useContext(ModalContext);

  const { mutate } = useUpdateHabit();
  const { mutate: mutateDelete } = useMutateHabit();

  const handleArchive = async () => {
    try {
      mutate({ habitId: habit.id, fieldsToUpdate: { archived: true } });

      mutateDelete({ type: "delete", habitId: habit.id });
    } catch (err) {
      toast.error("Could not move to archived. Try later.");
    }
  };

  return (
    <div className="flex items-center gap-2 relative">
      {habit.completed && (
        <MdArchive className="icon__with__bg" onClick={handleArchive} />
      )}
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
