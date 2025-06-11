import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import HabitFilterButtons from "./HabitFilterButtons";

const HabitsTracker = () => {
  return (
    <section className={`flex flex-col gap-6 p-6 box__shadow rounded-sm`}>
      <div className="flex flex-col gap-5">
        <HabitFilterButtons />
        <HabitsList />
      </div>
      <div>
        <Pagination />
      </div>
    </section>
  );
};

export default HabitsTracker;
