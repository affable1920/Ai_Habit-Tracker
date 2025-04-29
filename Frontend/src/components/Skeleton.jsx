import React from "react";

const Skeleton = ({ shape = "size-full" }) => {
  return <div className={`skeleton ${shape}`}></div>;
};

export default Skeleton;
