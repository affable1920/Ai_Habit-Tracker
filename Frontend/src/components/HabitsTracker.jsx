import { Navigate } from "react-router-dom";
import Pagination from "./Pagination";
import HabitsList from "./HabitsList";
import useAuthStore from "../stores/authStore";
import HabitFilterButtons from "./HabitFilterButtons";

const HabitsTracker = () => {
  const token = useAuthStore((s) => s.token);

  if (!token) return <Navigate to="/login" />;

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
