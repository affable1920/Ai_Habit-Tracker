import React, { useContext, useState } from "react";
import { GrResources } from "react-icons/gr";
import { IoIosThumbsDown, IoIosThumbsUp, IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { ModalContext } from "./Providers/ModalProvider";

const alignment = "alignmentWithCurrentGoals";
const Recommendation = ({ rec, handleRecFeedback }) => {
  const [showResources, setShowResources] = useState(false);
  const { dispatch } = useContext(ModalContext);

  const common = "cp icon__with__bg";
  const navigate = useNavigate();
  return (
    <article className={`recommendation md:relative`} key={rec.benefits}>
      <header>{rec.message}</header>
      <section className="mt-4 flex flex-col gap-2">
        <div>
          <span>What you'll get: </span>
          <br></br>
          {rec.benefits}
        </div>
        <div>
          <span>You say why ?</span>
          <br></br>
          {rec[alignment]}
        </div>
        <div className="flex gap-2 mt-4 items-center justify-between">
          <div />
          <div className="flex gap-2 self-center items-center">
            <IoIosThumbsUp
              className={`${common}`}
              onClick={() => handleRecFeedback.onThumbsUp(rec)}
            />
            <IoMdAdd
              className={`${common}`}
              onClick={() => {
                navigate("/add", { state: { type: "rec", rec } });
                dispatch({ type: "CLOSE_MODAL" });
              }}
            />
            <IoIosThumbsDown
              className={common}
              onClick={() => handleRecFeedback.onThumbsDown(rec)}
            />
          </div>
          <div className="self-end">
            <GrResources
              onClick={() => setShowResources(!showResources)}
              className={`${common} active:scale-125 active:text-white transition-all duration-200`}
            />
            {showResources && (
              <Modal
                open={showResources}
                onClose={() => setShowResources(false)}
              >
                <h4 className="text-xs text-center text-black tracking-wide font-medium p-1 dark:text-white">
                  Resources to get you started
                </h4>
                <ul
                  className="rounded-md text-slate-200 mt-2 
                  overflow-hidden text-xs italic tracking-wide"
                >
                  {Object.entries(rec.resources).map(([key, value]) => (
                    <li className="my-2">
                      <Link
                        className="flex flex-col rounded-inherit hover:bg-slate-800 
                        transition-colors duration-200 p-2"
                        to={value}
                      >
                        <span>
                          {key.charAt(0).toLocaleUpperCase() + key.slice(1)}
                        </span>
                        <span className="text-white mt-[2px]">{value}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Modal>
            )}
          </div>
        </div>
      </section>
    </article>
  );
};

export default Recommendation;
