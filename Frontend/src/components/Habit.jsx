import React from "react";
import HabitButtons from "./HabitButtons";
import { MdChevronRight, MdModeEdit } from "react-icons/md";
import Button from "./Button";
import useModalStore from "../stores/modalStore";
import { IoMdArrowDropdown } from "react-icons/io";

const tags = new Set(["button", "a", "span", "i", "svg", "path", "input"]);

const Habit = React.memo(
  ({
    habit: { id = "", title = "", description = "", status = "", streak = 0 },
  }) => {
    const openModal = useModalStore((s) => s.openModal);
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleToggle = (ev) => {
      if (tags.has(ev.target.tagName.toLowerCase())) return;
      setIsExpanded((exp) => !exp);
    };

    const handleEdit = async () => {
      const habitId = id;
      openModal("EDIT_HABIT", { props: { habitId } });

      return;

      // try {
      //   await editHabit(habitId);
      // } catch (ex) {
      //   throw ex;
      // }
    };

    return (
      <article onClick={handleToggle} className="habit">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <h6 className="capitalize text-sm">{title}</h6>
            <IoMdArrowDropdown className="opacity-40 hover:opacity-80 dark:opacity-30 dark:hover:opacity-60" />
          </div>
          <section className="flex flex-col gap-1">
            <Button onClick={handleEdit} color="warning">
              {status} <MdChevronRight />
            </Button>
            <HabitButtons habitId={id} />
          </section>
        </div>

        <div
          className={`flex justify-between items-center text-sm ${
            isExpanded ? "" : "hidden"
          }`}
        >
          <p>{description}</p>
          <span>
            Streak: <span>{streak}</span>
          </span>
        </div>
      </article>
    );
  }
);

export default Habit;
