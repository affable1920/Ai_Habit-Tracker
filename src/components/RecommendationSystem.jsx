import React, { useEffect, useState } from "react";
import useHabits from "../hooks/useHabits";
import { getPrompt } from "../Utils/handleAi";
import Gemini from "../hooks/GeminiSDK";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { GrResources } from "react-icons/gr";

const systemInstruction = `You are an AI assistant that provides strict, factual, and worldly habit recommendations,
pushing users to their limits to become the best, most disciplined version of themselves (Sigma mindset).  

Keep the habit context in mind, try to analyze if the habit the user wants to add is something new for them or
something he has been doing or trying to do and keep your responses that way, Don't overwhelm users.
Give three recommendations based on the user's habits.
But if the user has no habits currently, we just want a single recommendation for them with the same properties
but the message should be motivational, factual, strict, and forced`;

const RecommendationSystem = () => {
  const { data: { habits = [] } = {} } = useHabits();
  const [prompt, setPrompt] = useState(null);

  const [recommendations, setRecommendations] = useState([]);
  const [viewRec, setViewRec] = useState(true);
  const genAi = new Gemini(systemInstruction, prompt);

  useEffect(() => {
    localStorage.getItem("viewRec") &&
      setViewRec(localStorage.getItem("viewRec"));

    setPrompt(getPrompt(habits));
  }, [prompt, habits]);

  useEffect(() => {
    if (prompt) getRecommendations();
    async function getRecommendations() {
      genAi.autoFetch = true;
      try {
        const parsed = JSON.parse(await genAi.fetch());
        setRecommendations(parsed);
      } catch (err) {
        console.log(err);
      }
    }
  }, [prompt, habits]);

  const alignment = "alignmentWithCurrentGoals";
  const toggleViewRec = () => {
    setViewRec(!viewRec);
    localStorage.setItem("viewRec", viewRec);
  };
  console.log(recommendations);

  return (
    <>
      {viewRec && (
        <div className="p-4 shadow-2xl shadow-gray-300 border-[1px] border-black/15 rounded-lg">
          <header className="flex flex-col">
            <div
              onClick={toggleViewRec}
              className="cp w-2 h-2 bg-red-600 rounded-full bg-opacity-70 
              hover:bg-opacity-100 hover:scale-105 transition-all duration-200 self-end"
            />
            <h3 className="headings__large text-center">
              Recommendation System
            </h3>
          </header>
          <div className="shadow-lg">
            {recommendations && (
              <ul className="text-sm tracking-wide italic font-medium mt-4">
                {recommendations?.map((rec) => (
                  <div
                    className="p-4 bg-color__primary text-slate-100 border-[2px] border-sky-300/40 mt-3 
                    rounded-md text-xs"
                    key={rec.benefits}
                  >
                    <header>{rec.message}</header>
                    <section className="mt-3 flex flex-col gap-2">
                      <div>{rec.benefits}</div>
                      <div>{rec[alignment]}</div>
                      <GrResources className="self-end cp" />
                    </section>
                  </div>
                ))}
              </ul>
            )}
          </div>
          <footer className="mt-2 flex justify-center items-center gap-2">
            <FaRegThumbsDown className="icon__with__bg cp" />
            <FaRegThumbsUp className="icon__with__bg cp" />
          </footer>
        </div>
      )}{" "}
    </>
  );
};

export default RecommendationSystem;
