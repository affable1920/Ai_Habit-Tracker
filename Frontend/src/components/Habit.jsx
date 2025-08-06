import { useState, useRef } from "react";
import HabitButtons from "./HabitButtons";
import { GoChevronRight } from "react-icons/go";
import { MdModeEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { toast } from "sonner";
import { FcLowPriority, FcHighPriority } from "react-icons/fc";
import { FcMediumPriority, FcReadingEbook } from "react-icons/fc";
import { FcRegisteredTrademark } from "react-icons/fc";
import useHabitStore from "../stores/habitStore";
import useModalStore from "../stores/modalStore";
import { MODALS } from "../../constants/MODALS";
import { deCapitalize } from "../Utils/utilFns";

const Habit = ({ habit }) => {
  const [title, setTitle] = useState(habit.title || "");
  const [description, setDescription] = useState(habit.description || "");

  const [initialInfo] = useState({
    title: deCapitalize(habit.title),
    description: deCapitalize(habit.description),
    completed: deCapitalize(habit.completed),
  });

  const [loadMore, setLoadMore] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const openModal = useModalStore((s) => s.openModal);

  const loadRef = useRef(null);
  const editHabit = useHabitStore((s) => s.editHabit);

  const onEdit = async (fields) => {
    const allowEdit = fields.completed && !habit.completed;

    if (allowEdit) {
      openModal(MODALS.EDIT_HABIT, {
        props: { habitId: habit.id, fieldsToUpdate: fields },
      });
      return;
    }

    let { success, msg } = await editHabit(habit.id, fields);
    if (typeof msg != "string")
      msg = success ? "Habit successfully updated !" : "Error updating habit !";

    if (!success) {
      toast.error(msg);
      return;
    }

    toast.success(msg);
    if (isEditable) setIsEditable(false);
  };

  let tags = ["button", "a", "span", "i", "svg", "path", "input"];
  const onLoad = (e) => {
    if (
      e.currentTarget === loadRef.current &&
      !tags.includes(e.target.tagName.toLowerCase())
    )
      setLoadMore(!loadMore);
  };

  const levels = {
    1: FcLowPriority,
    2: FcReadingEbook,
    3: FcMediumPriority,
    4: FcRegisteredTrademark,
    5: FcHighPriority,
  };

  const PriorityTag = levels[habit?.priority - 1];

  return (
    <article ref={loadRef} onClick={onLoad} className="habit" key={habit.id}>
      <div className="flex justify-between mb-3">
        <span>{PriorityTag && <PriorityTag />}</span>
        <button
          disabled={habit.completed}
          onClick={() =>
            onEdit({
              completed: true,
            })
          }
          className={`flex items-center gap-1 font-bold disabled:opacity-70 text-[8px] tracking-widest
              p-2 py-[6px] rounded-md shadow-sm relative text-black ${
                habit.completed ? "bg-green-400" : "bg-yellow-400"
              }`}
        >
          {habit.status}
          <GoChevronRight />
        </button>
      </div>
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-[8px]">
          {isEditable ? (
            <div className="flex items-center relative">
              <input
                className="input"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              {isEditable && !!title && (
                <button
                  disabled={!title || title.toLowerCase() === initialInfo.title}
                >
                  <TiTick
                    onClick={() => onEdit({ title })}
                    className="absolute right-1 top-1/2 -translate-y-1/2 disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </button>
              )}
            </div>
          ) : (
            <h6 className="habit__title">{habit.title}</h6>
          )}
          <MdModeEdit
            onClick={() => setIsEditable(!isEditable)}
            className="cp opacity-50 text-xs"
          />
        </div>
        <HabitButtons
          onDropdownClick={() => setLoadMore(!loadMore)}
          habit={habit}
        />
      </header>
      <div
        className={`habit_body pt-2 flex justify-between items-center text-sm ${
          loadMore ? "" : "hidden"
        }`}
      >
        {isEditable ? (
          <div className="flex items-center relative">
            <input
              className="input"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            {isEditable && !!description && (
              <TiTick
                onClick={() => onEdit({ description })}
                className="absolute right-1 top-1/2 -translate-y-1/2"
              />
            )}
          </div>
        ) : (
          <p className="text-xs font-mono leading-4">{habit?.description}</p>
        )}
        <span className="tracking-widest text-[10px] italic font-medium">
          Streak: <span>{habit?.streak}</span>
        </span>
      </div>
    </article>
  );
};

export default Habit;
