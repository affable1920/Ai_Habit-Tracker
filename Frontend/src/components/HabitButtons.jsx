import React from "react";
import Button from "./Button";
import useModalStore from "../stores/modalStore";
import { MdDelete } from "react-icons/md";
import { RiCollapseHorizontalFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";

const HabitButtons = React.memo(({ habitId }) => {
  const openModal = useModalStore((s) => s.openModal);

  const onDelete = () =>
    openModal("DELETE_CONFIRM", {
      props: { habitId },
    });

  const habitBtns = [
    {
      Btn: RiCollapseHorizontalFill,
      props: {
        onClick: () => openModal("HABIT_INFO", { props: { habitId } }),
      },
    },
    { Btn: MdDelete, props: { onClick: onDelete } },
    { Btn: SlOptionsVertical, props: {} },
  ];

  return (
    <div className="flex items-center justify-end gap-2">
      {habitBtns.map(({ Btn, props }, i) => (
        <Button key={i} {...props}>
          <Btn />
        </Button>
      ))}
    </div>
  );
});

export default HabitButtons;
