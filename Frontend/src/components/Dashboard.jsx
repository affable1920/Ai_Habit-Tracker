import HabitsTracker from "./HabitsTracker";

const Dashboard = () => {
  const gridAreasMD = `
  "tracker tracker box1"
  "tracker tracker box2"
  "tracker tracker box2"
  ".       .       ."
  ".       .       ."
  ".       .       ."
  ".       .       ."
  ".       .       ."
  `;

  const gridAreasLG = `
  "tracker tracker tracker box1"
  "tracker tracker tracker box1"
  "tracker tracker tracker box2"
  "tracker tracker tracker box2"
  "tracker tracker tracker box2"
  "tracker tracker tracker box2"
  ".       .       .       ."
  ".       .       .       ."
  ".       .       .       ."
  ".       .       .       ."
  ".       .       .       ."
  ".       .       .       ."
  `;

  return (
    <div
      className="wrapper h-full max-h-[calc(100vh-8rem)] mt-6 rounded-lg p-4 ring-0 md:ring-1 
     md:shadow-lg md:shadow-black/15 md:dark:shadow-black/50 md:dark:ring-secondary-lighter/30
     md:ring-light-darkest/50 grid"
    >
      <div
        // style={{ gridTemplateAreas: gridAreasMD }}
        className="md:grid bg-blue-50 h-full
      md:grid-cols-3 md:grid-rows-[repeat(3, 1fr)] gap-2 lg:grid-rows-4 lg:rows-12"
      >
        <div className="col-span-2">
          <HabitsTracker />
        </div>

        <div
          className="box box__lg__screen box__shadow row-span-1"
          // style={{ gridArea: "box1" }}
        >
          Dash Box 1
        </div>

        <div
          className="box box__lg__screen box__shadow"
          // style={{ gridArea: "box2" }}
        >
          Dash Box 2
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
