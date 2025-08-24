import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import HabitFilterButtons from "./HabitFilterButtons";

const HabitsTracker = () => {
  return (
    <section className="flex flex-col gap-4 bg-inherit app-shadow p-8">
      <section className="flex flex-col gap-4">
        <HabitFilterButtons />
        <HabitsList />
      </section>
      <Pagination />
    </section>
  );
};

export default HabitsTracker;
