const streakLevels = [
  { threshold: 365, title: "Legendary Achiever" },
  { threshold: 180, title: "Streak Master" },
  { threshold: 30, title: "Steady Climber" },
  { threshold: 15, title: "Streak Seeker" },
  { threshold: 7, title: "Starter" },
];

export const streakMap = {
  Beginner: "bg-slate-400",
  Starter: "bg-slate-600",
  Streak__Seeker: "bg-sky-400",
  Steady__Climber: "bg-cyan-600",
  Streak__Master: "bg-green-400",
  Legendary__Achiever: "bg-orange-400",
};

const getStreakTitle = (streak) => {
  const level = streakLevels.find((level) => streak >= level.threshold);
  return level ? level.title : "Beginner";
};

export default getStreakTitle;
