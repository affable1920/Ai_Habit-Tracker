import React from "react";
import HabitsTracker from "./HabitsTracker";
import RecommendationSystem from "./RecommendationSystem";

const Dashboard = () => {
  return (
    <>
      <section className="p-3 grid px-10 mt-6 md:grid md:grid-rows-2 gap-3 md:gap-6">
        <RecommendationSystem />
        <HabitsTracker />
      </section>
    </>
  );
};

export default Dashboard;
