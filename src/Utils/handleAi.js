export function getPrompt(habits) {
  if (habits?.length === 0) {
    return `The user has no recorded habits yet. 
    Generate a motivational message encouraging the user to add and start tracking habits`;
  }

  return JSON.stringify(
    habits.map((habit) => ({
      title: habit.title,
      description: habit.description,
      frequency: habit.frequency || "Not Frequent",
      priority: habit.priority || "Medium",
    })),
    null,
    ",\n"
  );
}
export function handleGeminiResponse(initialText) {
  const transformedString = initialText.slice(
    initialText.indexOf("{"),
    initialText.indexOf("}") + 1
  );
  try {
    return JSON.parse(transformedString);
  } catch (e) {
    console.log(e);
  }
}

export default {
  getPrompt,
  handleGeminiResponse,
};
