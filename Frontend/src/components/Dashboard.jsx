import HabitsTracker from "./HabitsTracker";

const Dashboard = () => {
  const gridAreas = `
  "tracker tracker box1 box2"
  "tracker tracker box1 box2"
  "tracker tracker box1 box2"
  "tracker tracker box1 box2"
  "tracker tracker box1 box2"
  "tracker tracker .    box2"
  ".       .       .    ."
  ".       .       .    ."
  ".       .       .    ."
  ".       .       .    ."
  ".       .       .    ."
  ".       .       .    ."
  `;

  return (
    <div
      className="wrapper h-full max-h-[calc(100vh-8rem)] mt-6 rounded-lg p-3 ring-1 
     shadow-lg shadow-black/15 dark:shadow-black/50 dark:ring-secondary-lighter/30
     ring-light-darkest/50"
    >
      <div
        style={{ gridTemplateAreas: gridAreas }}
        className="grid grid-cols-4 grid-rows-12 px-4 py-3 gap-3 h-full"
      >
        <div className="box" style={{ gridArea: "tracker" }}>
          <HabitsTracker />
        </div>

        <div className="box bg-gray-200" style={{ gridArea: "box1" }}>
          Dash Box 1
        </div>

        <div className="box bg-gray-200" style={{ gridArea: "box2" }}>
          Dash Box 2
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
