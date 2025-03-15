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
import { RiAiGenerate } from "react-icons/ri";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { SiLivechat } from "react-icons/si";
import { ModalContext } from "./Providers/ModalProvider";
import axios from "axios";
import { LoadinStateContext } from "./Providers/AppProviders";
import loadingStore from "../stores/loadingStore";

const RecommendationSystem = ({ onClose }) => {
  const { data: { habits = [] } = {} } = useHabits();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const recRef = collection(firestore, "users", user?.uid, "recommendations");
  const onThumbsUp = async (rec) => {
    try {
      await setDoc(doc(recRef, rec.id), { ...rec, type: "liked" });
    } catch (err) {
      alert(err);
    }
  };

  const onThumbsDown = async (rec) => {
    try {
      await setDoc(doc(recRef, rec.id), { ...rec, type: "disliked" });
    } catch (err) {
      alert(err);
    }
  };

  const { dispatch } = useContext(ModalContext);
  const { setLoading } = loadingStore();

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () =>
      axios
        .get("http://localhost:8000/recommendations")
        .then(({ data }) => data),
    enabled: false,
  });

  if (isLoading) setLoading(true);

  return (
    <section>
      <header className="flex items-start relative justify-center">
        <h4 className="font-mono font-semibold text-center mb-2">
          Recommender
        </h4>
      </header>
      <div>
        <div className="flex flex-col">
          <ul className="flex gap-2">
            {data?.recommendations &&
              data?.recommendations?.map((rec) => (
                <li>
                  <Recommendation
                    rec={rec}
                    handleRecFeedback={{ onThumbsUp, onThumbsDown }}
                  />
                </li>
              ))}
          </ul>
          <div
            className={`flex gap-2 m-2 justify-center md:hidden ${
              "recommendations.length" <= 1 && "hidden"
            }`}
          >
            <MdNavigateBefore
              className={`cp icon__with__bg ${
                "ifPrevious"
                  ? "text-slate-800"
                  : "pointer-events-none text-slate-300"
              }`}
            />
            <MdNavigateNext
              className={`cp icon__with__bg ${
                "ifNext"
                  ? "text-slate-800"
                  : "pointer-events-none text-slate-300"
              }`}
            />
          </div>
        </div>
        <div className={`mt-6 relative`}>
          <div
            className={`flex gap-2 items-end ${
              "notRecommendations"
                ? "flex-col items-center pt-20"
                : "justify-end"
            }`}
          >
            <button
              onClick={refetch}
              className={`btn bg-color-white text-black shadow-md ring-2 ring-slate-100 dark:text-slate-100
                 flex items-center gap-2 dark:shadow-black dark:bg-zinc-800 dark:ring-zinc-700`}
            >
              Generate
              <RiAiGenerate />
            </button>
            <SiLivechat
              className="icon__with__bg cp"
              onClick={() => {
                navigate("/chat");
                dispatch({ type: "CLOSE_ALL" });
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSystem;
