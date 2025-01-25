import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPrompt, handleGeminiResponse } from "../Utils/handleAi";
import useHabits from "../hooks/useHabits";
import key from "../apiKey";

const RecommendationSystem = () => {
  const systemInstruction = `
You are an AI habit-building assistant integrated into a habit tracker app.
If a user has no habits, respond with a motivational message encouraging them to start and make them want to use this app to its full potential. Keep it concise and inspiring.
If the user has existing habits, analyze them and suggest focused, practical recommendations to improve their routine.
Output all responses in JSON format always with keys message
for motivational text or empty string and recommendations array if habits exist or empty array.
Always keep responses brief, structured, high-level and goal-oriented.
  `;
  const { data } = useHabits();
  const genAi = new GoogleGenerativeAI(key);
  const model = genAi.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction,
  });

  const [AiResponse, setAiResponse] = useState();
  const [prompt, setPrompt] = useState();

  useEffect(() => data?.habits && setPrompt(getPrompt(data.habits)), [prompt]);
  useEffect(() => {
    const controller = new AbortController();

    if (!prompt) return;
    function fetchResponse() {
      model
        .generateContent({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: { temperature: 1, topK: 80 },
        })
        .then(({ response }) =>
          setAiResponse(handleGeminiResponse(response.text()))
        )
        .catch((error) => console.log(error));
    }

    fetchResponse();
    return () => controller.abort();
  }, [AiResponse]);
  console.log(AiResponse);

  return (
    <>
      <div className="row-start-1 md:col-start-2">
        <h3 className="headings__large text-center">Recommendation System</h3>
        {AiResponse && (
          <div className="text-s font-mono font-medium leading-tight">
            {AiResponse?.message && <p>{AiResponse.message}</p>}
            {AiResponse?.recommendations && (
              <ul className="">
                {AiResponse.recommendations.map((r) => (
                  <li className="pt-4">{r}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RecommendationSystem;
