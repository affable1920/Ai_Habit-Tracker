import React from "react";
import HabitElement from "./HabitElement.js";
import useHabitStore from "../stores/habitStore.js";
import useQueryStore from "../stores/queryStore.js";
import useLoadingStore from "../stores/loadingStore.js";
import { toast } from "sonner";
import Spinner from "./Spinner.js";

const HabitsList = () => {
  const query = useQueryStore((s) => s.query);

  const loading = useLoadingStore((s) => s.loading);
  const setLoading = useLoadingStore((s) => s.setLoading);

  const habits = useHabitStore((store) => store.habits);
  const fetchHabits = useHabitStore((store) => store.fetchHabits);

  React.useEffect(() => {
    const getHabits = async () => {
      try {
        setLoading();
        await fetchHabits(query);
      } catch (ex: any) {
        console.log(ex);
        const { type = "", msg = "Could not fetch habits!" } = ex || {};
        toast.error(type ?? msg, msg ?? { description: msg });
      } finally {
        setLoading(false);
      }
    };

    getHabits();
  }, [query]);

  let infoText = "No Habits Found";

  const noHabits = !Array.isArray(habits) || habits.length === 0;
  const noneCompleted = noHabits && query.status === "completed";

  if (noneCompleted) infoText = "No completed habits yet";

  return (
    <section className="flex flex-col gap-4">
      {loading && <Spinner />}
      {noHabits && (
        <div className="text-error py-4 font-semibold text-shadow-2xs text-sm">
          {infoText} !
        </div>
      )}
      {habits.map((habit) => (
        <HabitElement key={habit.id} habit={habit} />
      ))}
    </section>
  );
};

export default HabitsList;
