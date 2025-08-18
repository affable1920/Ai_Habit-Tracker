import Spinner from "./Spinner";
import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import HabitFilterButtons from "./HabitFilterButtons";

import useLoadingStore from "../stores/loadingStore";

const HabitsTracker = () => {
  const loading = useLoadingStore((s) => s.loading);

  return (
    <section className={``}>
      <section className="flex flex-col gap-5 mb-3">
        <HabitFilterButtons />
        {loading ? <Spinner /> : <HabitsList />}
      </section>
      <Pagination />
    </section>
  );
};

export default HabitsTracker;
