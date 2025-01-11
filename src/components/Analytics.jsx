import React from "react";

const Analytics = () => {
  return (
    <section className="md:justify-self-center mt-3 md:flex grid md:gap-4 gap-5 md:items-start">
      <div className="border-[2px] border-slate-300 rounded-md shadow-xl p-3 pt-1">
        <header className="text-center mb-3">
          <h2 className="headings__large md:mt-0 text-indigo-950">Analytics</h2>
        </header>
        <article
          className="font-semibold tracking-wider bg-cyan-50 p-2 rounded-md
      border-[2px] border-slate-200"
        >
          <span className="text-sm">Total Habits Added: </span>
        </article>
      </div>
    </section>
  );
};

export default Analytics;
