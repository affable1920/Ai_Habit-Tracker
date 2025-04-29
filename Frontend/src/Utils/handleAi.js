const getPrompt = (habits, recsOrNewHabit) => {
  let prompt = "";

  if (habits.length === 0) return JSON.stringify([]);

  if (Array.isArray(recsOrNewHabit))
    prompt = {
      habits: JSON.stringify(habits),

      recommendations: JSON.stringify(recsOrNewHabit),
    };
  else
    prompt = {
      habits: JSON.stringify(habits),

      newHabit: JSON.stringify(recsOrNewHabit),
    };
  prompt = JSON.stringify(prompt).replaceAll("\\", "");

  return prompt;
};

export default getPrompt;
