import React from "react";
import queryStore from "../stores/queryStore";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { IoIosCloudDone } from "react-icons/io";

const StatusFilter = () => {
  const { query, setStatus } = queryStore();

  const handleSetStatus = () => {
    setStatus(query.status ? false : true);
  };

  return (
    <>
      <button onClick={handleSetStatus}>
        {query.status ? (
          <FaArrowsTurnToDots className="icon" />
        ) : (
          <IoIosCloudDone className="icon" />
        )}
      </button>
    </>
  );
};

export default StatusFilter;
