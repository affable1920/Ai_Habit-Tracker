import React, { useContext, useState } from "react";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import useHabits from "../hooks/useHabits";
import { QueryContext } from "./Providers/QueryProvider";

const StatusFilter = () => {
  const [status, setStatus] = useState(null);
  const { data } = useHabits();

  const { dispatch: queryDispatch } = useContext(QueryContext);

  const handleClick = (type) => {
    if (data?.habits.length === 0) return;

    setStatus(
      status === null
        ? "complete"
        : status === "complete"
        ? "incomplete"
        : "complete"
    );
    queryDispatch({ type });
  };

  return (
    <>
      <FaArrowsTurnToDots
        className="icon"
        onClick={() => handleClick("incomplete")}
      />
    </>
  );
};

export default StatusFilter;
