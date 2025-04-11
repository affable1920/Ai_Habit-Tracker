import React from "react";
import queryStore from "../stores/queryStore";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { IoIosCloudDone } from "react-icons/io";

const StatusFilter = () => {
  const { query, setStatus } = queryStore();

  const handleSetStatus = () => {
    setStatus(
      query.status === null
        ? "complete"
        : query.status === "complete"
        ? "incomplete"
        : "complete"
    );
  };

  return (
    <>
      <button onClick={handleSetStatus}>
        {query.status === "complete" ? (
          <FaArrowsTurnToDots className="icon" />
        ) : (
          <IoIosCloudDone className="icon" />
        )}
      </button>
    </>
  );
};

export default StatusFilter;
