import React from "react";
import { GrResources } from "react-icons/gr";
import { IoIosThumbsDown, IoIosThumbsUp, IoMdAdd } from "react-icons/io";

const alignment = "alignmentWithCurrentGoals";
const Recommendation = ({ rec }) => {
  return (
    <article
      className="recommendation dark:bg-color__primary"
      key={rec.benefits}
    >
      <header>{rec.message}</header>
      <section className="mt-4 flex flex-col gap-2">
        <div>
          <span className="text-white">What you'll get: </span>
          <br></br>
          {rec.benefits}
        </div>
        <div>
          <span className="text-white">You say why ?</span>
          <br></br>
          {rec[alignment]}
        </div>
        <div className="flex gap-2 mt-4 justify-center items-end">
          <IoIosThumbsUp className="cp" />
          <IoMdAdd className="cp rounded-sm font-bold" />
          <IoIosThumbsDown className="cp" />
        </div>
        <GrResources
          className="cp self-end active:scale-125 active:text-white transition-all
         duration-200"
        />
      </section>
    </article>
  );
};

export default Recommendation;
