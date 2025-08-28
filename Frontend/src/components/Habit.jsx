import React from "react";
import HabitButtons from "./HabitButtons";
import { MdChevronRight } from "react-icons/md";
import Button from "./Button";
import useModalStore from "../stores/modalStore";
import { IoMdArrowDropdown } from "react-icons/io";
import Spinner from "./Spinner";
import useLoadingStore from "../stores/loadingStore";

const tags = new Set(["button", "a", "span", "i", "svg", "path", "input"]);

const Habit = React.memo(({ habit }) => {
  const openModal = useModalStore((s) => s.openModal);
  const loading = useLoadingStore((s) => s.loading);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleToggle = (ev) => {
    if (tags.has(ev.target.tagName.toLowerCase())) return;
    setIsExpanded((exp) => !exp);
  };

  const onEdit = async () => {
    const habitId = id;
    openModal("EDIT_HABIT", { props: { habitId } });
  };

  const { status, description, title, id, completed } = habit;

  return (
    <article onClick={handleToggle} className="habit" key={id}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 text-sm tracking-wider">
          <h6 className="capitalize font-semibold">{title}</h6>
          <IoMdArrowDropdown className="opacity-40 hover:opacity-80 dark:opacity-30 dark:hover:opacity-60" />
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <Button
            onClick={onEdit}
            disabled={completed}
            color={completed ? "success" : "warning"}
            className="py-0.5 px-1 italic"
          >
            {status} <MdChevronRight />
          </Button>
          <HabitButtons habitId={id} />
        </div>
      </div>

      <div
        className={`text-sm ${
          isExpanded ? "flex justify-between items-end" : "hidden"
        }`}
      >
        <p>{description}</p>
        <p>Streak: {habit.streak}</p>
      </div>
    </article>
  );
});

export default Habit;
