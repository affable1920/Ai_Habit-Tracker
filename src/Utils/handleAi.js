export function getPrompt(habits, recs) {
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
