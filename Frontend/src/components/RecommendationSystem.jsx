import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { RiAiGenerate } from "react-icons/ri";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { SiLivechat } from "react-icons/si";
import { ModalContext } from "./Providers/ModalProvider";

const RecommendationSystem = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  // const recRef = collection(firestore, "users", user?.uid, "recommendations");
  const onThumbsUp = async (rec) => {
    try {
      // await setDoc(doc(recRef, rec.id), { ...rec, type: "liked" });
    } catch (err) {}
  };

  const onThumbsDown = async (rec) => {
    try {
      // await setDoc(doc(recRef, rec.id), { ...rec, type: "disliked" });
    } catch (err) {}
  };

  const { dispatch } = useContext(ModalContext);

  return (
    <section>
      <header className="flex items-start relative justify-center">
        <h4 className="font-mono font-semibold text-center mb-2">
          Recommender
        </h4>
      </header>
      <div>
        <div className="flex flex-col">
          <ul className="flex gap-2"></ul>
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
              className={`btn bg-color-white text-black shadow-md ring-2 ring-slate-100 dark:text-slate-100
                 flex items-center gap-2 dark:shadow-black dark:bg-zinc-800 dark:ring-zinc-700`}
            >
              Generate
              <RiAiGenerate />
            </button>
            <SiLivechat className="icon__with__bg cp" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSystem;
