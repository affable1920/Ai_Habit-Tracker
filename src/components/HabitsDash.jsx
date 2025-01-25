import React from "react";
import HabitsTracker from "./HabitsTracker";
import RecommendationSystem from "./RecommendationSystem";

const Dashboard = () => {
  return (
    <>
      <section className="p-3 grid xl:grid-cols-2 px-10 mt-6 md:grid md:grid-cols-2 gap-3 md:gap-6">
        <HabitsTracker />
        <RecommendationSystem />
      </section>
    </>
  );
};

export default Dashboard;
