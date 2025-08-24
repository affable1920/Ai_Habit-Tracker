import HabitsTracker from "./HabitsTracker";

const Dashboard = () => {
  return (
    <section className="py-4 grid grid-cols-12">
      <div className="col-span-full md:col-span-6 row-span-full">
        <HabitsTracker />
      </div>
    </section>
  );
};

export default Dashboard;
