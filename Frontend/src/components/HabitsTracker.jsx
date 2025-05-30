import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import HabitFilterButtons from "./HabitFilterButtons";

const HabitsTracker = ({ classes }) => {
  return (
    <section
      className={`flex flex-col shadow-black/10 shadow-md dark:shadow-black box box__wrapper`}
    >
      <div className="flex flex-col">
        <HabitFilterButtons />
        <HabitsList />
      </div>
      <Pagination />
    </section>
  );
};

export default HabitsTracker;
