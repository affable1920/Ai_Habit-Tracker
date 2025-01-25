import React, { useContext, useState } from "react";
import TooltipContext from "../context/TooltipContext";
import QueryContext from "../context/QueryContext";
import Tooltip from "./Tooltip";
import { MdCloudDone } from "react-icons/md";
import { FaArrowsTurnToDots } from "react-icons/fa6";

const StatusFilter = () => {
  const [status, setStatus] = useState(null);
  const { tooltip, dispatch } = useContext(TooltipContext);
  const { dispatch: queryDispatch } = useContext(QueryContext);

  const handleMouseEnter = () => {
    dispatch({
      type: "status",
      tooltip:
        status === "complete"
          ? "Show habits to complete !"
          : "Show completeted habits !",
    });
  };

  const handleMouseLeave = () => {
    dispatch({ type: "clear" });
  };

  const handleClick = (type) => {
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
      {(status === "incomplete" || status === null) && (
        <MdCloudDone
          className="icon"
          onClick={() => handleClick("complete")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
      {status === "complete" && (
        <FaArrowsTurnToDots
          className="icon"
          onClick={() => handleClick("incomplete")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
      {tooltip?.status && <Tooltip tagline={tooltip?.status} />}
    </>
  );
};

export default StatusFilter;
