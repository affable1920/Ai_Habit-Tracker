import { capitalise } from "../utilityFns/utils.js";
import useModalStore from "../stores/modalStore.js";
import type { Habit } from "../types/genericTypes.js";

const HabitInfo = () => {
  const { modalProps } = useModalStore((s) => s.modalProps);

  const unwanted = ["id", "category", "status"];

  let habit: Habit = modalProps?.habit || {};

  const properties = Object.entries(habit).filter(([key, value]) => {
    if (!unwanted.includes(key)) return value ? [key, value] : [key, "N/A"];
  });

  if (!modalProps || !modalProps?.habit) return null;

  return (
    <div className="flex  gap-3">
      {properties.map(([key, value]) => (
        <div
          className="flex justify-between gap-3 items-center italic tracking-wider"
          key={key}
        >
          <span className="leading-4 button button-primary">
            {capitalise(key)}
          </span>
          <span className={`leading-4 ${value && "button button-primary"}`}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HabitInfo;
