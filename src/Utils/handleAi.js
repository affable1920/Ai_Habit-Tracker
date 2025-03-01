const getPrompt = (habits, recs) => {
  let prompt = "";
  if (habits.length === 0) return JSON.stringify([]);
  else {
    prompt = {
      habits: JSON.stringify(habits),
      recommendations: JSON.stringify(recs),
    };
    prompt = JSON.stringify(prompt).replaceAll("\\", "");
  }
  return prompt;
};

export default getPrompt;
