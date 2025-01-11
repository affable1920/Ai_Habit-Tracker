import React, { useContext, useState } from "react";
import TooltipContext from "../context/TooltipContext";
import QueryContext from "../context/QueryContext";
import Tooltip from "./Tooltip";
import { MdCloudDone } from "react-icons/md";
import { FaArrowsTurnToDots } from "react-icons/fa6";

const StatusFilter = () => {
  const [statusFilter, setStatusFilter] = useState(null);
  const { tooltip, dispatch } = useContext(TooltipContext);
  const { dispatch: queryDispatch } = useContext(QueryContext);

  const handleStatusFilter = () => {
    setStatusFilter(statusFilter === null ? true : !statusFilter);
    queryDispatch({ type: "status", status: statusFilter });
  };

  const handleMouseEnter = () => {
    dispatch({
      type: "status",
      tooltip: statusFilter
        ? "Show Incomplete habits"
        : "Show habits to complete",
    });
  };

  const handleMouseLeave = () => {
    dispatch({ type: "clear" });
  };

  return (
    <>
      {!statusFilter ? (
        <MdCloudDone
          className="icon"
          onClick={handleStatusFilter}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <FaArrowsTurnToDots
          className="icon"
          onClick={handleStatusFilter}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
      {tooltip?.status && <Tooltip tagline={tooltip?.status} />}
    </>
  );
};

export default StatusFilter;
