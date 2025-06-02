import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import HabitFilterButtons from "./HabitFilterButtons";

const HabitsTracker = ({ classes }) => {
  return (
    <section
      className={`flex flex-col shadow-black/10 shadow-md dark:shadow-black box 
        box__wrapper h-full justify-between min-h-full`}
    >
      <div className="flex flex-col">
        <HabitFilterButtons />
        <HabitsList />
      </div>
      <div className="p-1">
        <Pagination />
      </div>
    </section>
  );
};

export default HabitsTracker;
