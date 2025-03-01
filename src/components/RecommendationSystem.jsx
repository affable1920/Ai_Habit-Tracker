import React, { useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import getPrompt from "../Utils/handleAi";
import useHabits from "../hooks/useHabits";
import Gemini from "../hooks/GeminiSDK";
import Recommendation from "./Recommendation";
import Spinner from "./Spinner";
import { firestore } from "../services/authService";
import AuthContext from "../context/AuthContext";
import { IoMdSettings } from "react-icons/io";
import { RiAiGenerate } from "react-icons/ri";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { SiLivechat } from "react-icons/si";
import { ModalContext } from "./Providers/ModalProvider";

const systemInstruction = `
You are an AI assistant that generates powerful, high-performance, must do habit recommendations that align with the
user’s current habits, interests, goals, and personal growth.

How You Should Respond:
Number of Recommendations
Three 

Context-Driven Recommendations
Analyze the user's habits carefully. For instance - If they add "Python for backend," your recommendations should
be related to backend development, database management, API design, system scalability, python 
or deeper programming concepts. There are no predefined response rules. The only rule is relevance—recommend habits
that logically extend, enhance, or push the user's existing habits. If the user has previous recommendations with 
feedback, refine new ones based on their reaction.

High-Impact Growth
Every recommendation should force progress in the user's chosen field.
If their habits indicate an interest in discipline, fitness, coding, business, finance, or mental resilience,
tailor the response accordingly. Do NOT recommend anything irrelevant, generic, or weak. Keep it sharp, useful,
and challenging. Adaptive, No Fluff, No Overload

If the user has no habits, provide one powerful habit that aligns with their nature and pushes them to improve.
Never overwhelm—progress should be intense but sustainable.
Strict, Logical, and Actionable

Responses must be factual, direct, and no-nonsense.
Provide a link where necessary to courses, videos and repositories, that truly help in that field.
No weak self-help advice. Only actionable, high-value habits. Just remember to send practical-strict and goal-
oriented recommendations back otherwise i DON'T NEED YOU!
`;

const RecommendationSystem = ({ onClose }) => {
  const { data: { habits = [] } = {} } = useHabits();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const recRef = collection(firestore, "users", user?.uid, "recommendations");

  const [prompt, setPrompt] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const ifNext = currentIndex < recommendations.length - 1;
  const ifPrevious = currentIndex != 0;

  const { dispatch } = useContext(ModalContext);
  const { data = [] } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      return (await getDocs(recRef)).docs.map((doc) => doc.data());
    },
  });

  useEffect(() => {
    setPrompt(getPrompt(habits, data));
  }, [habits]);

  const genAi = new Gemini(systemInstruction, prompt);
  let notRecommendations = !recommendations || recommendations.length === 0;

  async function getRecommendations() {
    setIsLoading(true);
    try {
      const parsed = JSON.parse(await genAi.fetch());
      console.log(parsed);
      setRecommendations(parsed.map((rec) => ({ id: v4(), ...rec })));
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  }

  const onThumbsUp = async (rec) => {
    try {
      await setDoc(doc(recRef, rec.id), { ...rec, type: "liked" });
    } catch (err) {
      alert(err);
    }
  };

  const onThumbsDown = async (rec) => {
    setIsLoading(true);
    try {
      await setDoc(doc(recRef, rec.id), { ...rec, type: "disliked" });
      setRecommendations(recommendations.filter((r) => r.id != rec.id));
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={``}>
      <header className="flex items-start relative justify-center">
        <h4 className="font-mono font-semibold text-center mb-2">
          Recommendation System
        </h4>
        <IoMdSettings className="cp icon__with__bg absolute -top-4 -right-10" />
      </header>
      <div>
        <div className="flex flex-col">
          {!notRecommendations && (
            <>
              <ul className="flex gap-2">
                {recommendations?.map((rec, index) => (
                  <li
                    className={`${
                      index === currentIndex ? "block" : "hidden"
                    } md:block`}
                  >
                    <Recommendation
                      rec={rec}
                      onClose={onClose}
                      handleRecFeedback={{ onThumbsUp, onThumbsDown }}
                    />
                  </li>
                ))}
              </ul>
              <div
                className={`flex gap-2 m-2 justify-center md:hidden ${
                  recommendations.length <= 1 && "hidden"
                }`}
              >
                <MdNavigateBefore
                  onClick={() =>
                    setCurrentIndex(
                      ifPrevious ? currentIndex - 1 : currentIndex
                    )
                  }
                  className={`cp icon__with__bg ${
                    ifPrevious
                      ? "text-slate-800"
                      : "pointer-events-none text-slate-300"
                  }`}
                />
                <MdNavigateNext
                  className={`cp icon__with__bg ${
                    ifNext
                      ? "text-slate-800"
                      : "pointer-events-none text-slate-300"
                  }`}
                  onClick={() =>
                    setCurrentIndex(ifNext ? currentIndex + 1 : currentIndex)
                  }
                />
              </div>
            </>
          )}
        </div>
        <div className={`mt-4 relative`}>
          {isLoading && <Spinner />}
          <div
            className={`flex gap-2 items-end ${
              notRecommendations ? "flex-col items-center pt-20" : "justify-end"
            }`}
          >
            <button
              className={`btn btn__accent text-white flex items-center gap-2`}
              onClick={getRecommendations}
            >
              {notRecommendations ? "Generate" : "Re-Generate"}
              <RiAiGenerate />
            </button>
            <SiLivechat
              onClick={() => {
                navigate("/chat");
                dispatch({ type: "CLOSE_MODAL" });
                onClose();
              }}
              className={`cp icon__with__bg ${
                isLoading && "pointer-events-none"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSystem;
