export function getPrompt(habits) {
  if (habits.length === 0 || !habits) return JSON.stringify([]);

  return JSON.stringify(
    habits?.map((habit) => ({
      title: habit.title,
      description: habit.description,
      priority: habit.priority || "Medium",
      frequency: habit.frequency || "Not frequent",
    }))
  );
}
export function handleGeminiResponse(initialText) {
  const transformedString = initialText.slice(
    initialText.indexOf("{"),
    initialText.lastIndexOf("}") + 1
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
