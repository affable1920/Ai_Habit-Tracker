import Pagination from "./Pagination.js";
import HabitsList from "./HabitsList.js";
import HabitFilterButtons from "./HabitFilterButtons.js";

const HabitsTracker = () => {
  return (
    <section className="flex flex-col gap-6 bg-inherit app-shadow p-8">
      <section className="flex flex-col gap-8">
        <HabitFilterButtons />
        <HabitsList />
      </section>
      <Pagination />
    </section>
  );
};

export default HabitsTracker;
