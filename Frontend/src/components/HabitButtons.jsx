import React from "react";
import Button from "./Button";
import HabitOptions from "./HabitOptions";
import useModalStore from "../stores/modalStore";
import { MdDelete } from "react-icons/md";
import { RiCollapseHorizontalFill } from "react-icons/ri";

const HabitButtons = React.memo(({ habitId }) => {
  const openModal = useModalStore((s) => s.openModal);

  const onDelete = () =>
    openModal("DELETE_CONFIRM", {
      props: { habitId },
    });

  return (
    <div className="flex items-center gap-1 relative">
      <Button
        onClick={() =>
          openModal("HABIT_INFO", {
            props: { habitId },
          })
        }
      >
        <RiCollapseHorizontalFill />
      </Button>
      <Button onClick={onDelete}>
        <MdDelete />
      </Button>
      <HabitOptions habit={habitId} />
    </div>
  );
});

export default HabitButtons;
