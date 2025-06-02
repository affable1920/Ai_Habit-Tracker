import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdStart } from "react-icons/md";
import Habit from "./Habit";
import useHabitStore from "../stores/habitStore";
import queryStore from "./../stores/queryStore";
import Icon from "./Icon";
import { debounce } from "../Utils/utils";

const HabitsList = () => {
  const habits = useHabitStore((store) => store.habits);
  const fetchHabits = useHabitStore((store) => store.fetchHabits);

  const query = queryStore((s) => s.query);
  const search_query = queryStore((s) => s.search_query);

  let setMax = queryStore((s) => s.setMax);
  setMax = debounce(setMax, 300);

  useEffect(() => {
    fetchHabits(query);
  }, [query]);

  const minHabitWidth = "240px";
  const minHabitHeight = "100px";

  const [maxHabitsCount, setMaxHabitsCount] = useState(0);

  const trackerRef = useRef(null);

  const resizeCallback = ([e]) => {
    const { width, height } = e.contentRect;
    const regex = /\W/;

    minHabitWidth.replace(regex, "");
    minHabitHeight.replace(regex, "");

    if (typeof minHabitWidth != "number" || typeof minHabitHeight != "number") {
      setMaxHabitsCount(Math.floor(window.innerWidth / 240));
    } else
      setMaxHabitsCount(
        Math.floor(width / minHabitWidth) + Math.floor(height / minHabitHeight)
      );
  };

  useEffect(() => {
    const ro = new ResizeObserver(resizeCallback);
    const el = trackerRef.current;

    const isHTMLELEMENT = el && el instanceof HTMLElement;

    if (isHTMLELEMENT);
    ro.observe(el);

    return () => {
      if (isHTMLELEMENT) ro.unobserve(el);
    };
  }, []);

  useEffect(() => {
    setMax(maxHabitsCount);
  }, [maxHabitsCount]);

  return (
    <section
      ref={trackerRef}
      className="flex flex-col gap-2 md:grid
        md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] mt-4 box"
    >
      {habits?.length === 0 && (
        <div className="flex items-center flex-col gap-2">
          <p className="text-sm font-bold font-mono tracking-widest mt-4">
            {search_query ? "No such habits found !" : "No Habits added yet"}
          </p>
          {!search_query && (
            <Link to="/add">
              <Icon Icon={MdStart} bg={true} />
            </Link>
          )}
        </div>
      )}

      {Array.isArray(habits) &&
        habits.map((habit) => <Habit habit={habit} key={habit.id} />)}
    </section>
  );
};

export default HabitsList;
