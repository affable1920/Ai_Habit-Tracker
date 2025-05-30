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

  const maxHabitWidth = "240px";
  const maxHabitHeight = "100px";

  const [maxHabitsCount, setMaxHabitsCount] = useState(0);

  const trackerRef = useRef(null);

  const resizeCallback = ([e]) => {
    const { width, height } = e.contentRect;

    const minWidthInt = maxHabitWidth.match(/\d+/);
    const minHeightInt = maxHabitHeight.match(/\d+/);

    if ((!minWidthInt instanceof Number) & (!minHeightInt instanceof Number))
      setMaxHabitsCount(window.innerWidth / 240);

    setMaxHabitsCount(
      Math.floor(width / minWidthInt) + Math.floor(height / minHeightInt)
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
