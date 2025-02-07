import React, { useEffect, useState } from "react";
import useHabits from "../hooks/useHabits";
import Gemini from "../hooks/GeminiSDK";
import Recommendation from "./Recommendation";
import Spinner from "./Spinner";
import { getPrompt } from "../Utils/handleAi";
import { IoMdSettings } from "react-icons/io";
import { RiAiGenerate } from "react-icons/ri";
import { FcNoIdea } from "react-icons/fc";

const systemInstruction = `You are an AI assistant that provides strict, factual, and worldly 
habit recommendations, pushing users to their limits to become the best, most disciplined
version of themselves (Sigma mindset).  

Keep the habit context in mind, try to analyze if the habit the user wants to add is something new for them or
something he has been doing or trying to do and keep your responses that way, Don't overwhelm users.

Give one most useful recommendations based on the user's habits.
But if the user has no habits currently, we just want a single recommendation for them with the same properties
but the message should be motivational, factual, strict, and forced`;

const RecommendationSystem = () => {
  const { data: { habits = [] } = {} } = useHabits();
  const [prompt, setPrompt] = useState(null);

  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const genAi = new Gemini(systemInstruction, prompt);
  useEffect(() => {
    setPrompt(getPrompt(habits));
  }, [prompt, habits]);

  let notRecommendations = !recommendations || recommendations.length === 0;
  async function getRecommendations() {
    genAi.autoFetch = true;
    setIsLoading(true);
    try {
      const parsed = JSON.parse(await genAi.fetch());
      setRecommendations(parsed);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  return (
    <section
      className={`${notRecommendations && "min-h-[400px] min-w-[400px]"}`}
    >
      <header className="flex justify-end mt-1 gap-1 items-center">
        <IoMdSettings className="cp icon__with__bg" />
      </header>
      <section>
        <h4 className="font-mono font-semibold text-center mb-2">
          Recommendation System
        </h4>
        <div className="px-2">
          {!notRecommendations && (
            <ul className="flex gap-3">
              {recommendations?.map((rec) => (
                <Recommendation rec={rec} />
              ))}
            </ul>
          )}
          <div
            className={`mt-4 relative flex justify-end ${
              !notRecommendations ? "items-end" : "items-center"
            } gap-2 ${isLoading && "pb-8"} ${
              notRecommendations && "justify-center"
            }`}
          >
            {isLoading && <Spinner />}
            {!isLoading && (
              <button className={`btn__generate`} onClick={getRecommendations}>
                Generate
                <RiAiGenerate />
              </button>
            )}
            {!isLoading && <FcNoIdea className="cp icon__with__bg" />}
          </div>
        </div>
      </section>
    </section>
  );
};

export default RecommendationSystem;
