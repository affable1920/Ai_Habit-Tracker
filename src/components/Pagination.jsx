import React, { useContext } from "react";
import TooltipContext from "../context/TooltipContext";
import Tooltip from "./Tooltip";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import QueryContext from "../context/QueryContext";

const Pagination = ({ paginated }) => {
  const { query, dispatch } = useContext(QueryContext);
  const { tooltip, dispatch: tooltipDispatch } = useContext(TooltipContext);

  const prevDisabled = query?.currentPage === 1;
  const nextDisabled = false;

  return (
    <div className=" flex justify-end mt-3">
      <div className="flex items-center bg-slate-200 ring-slate-300 ring-[1px] gap-2 p-2 ml-auto rounded-md ">
        <div className="text-xs font-semibold tracking-wide">
          <label htmlFor="pageSize">Habits per page:</label>
          <select
            onChange={(e) =>
              dispatch({
                type: "set_pageSize",
                pageSize: e.target.value,
              })
            }
            name="pageSize"
            value={query.pageSize}
            className="bg-slate-500 cursor-pointer rounded-md ml-2 outline-none text-white p-[2px] text-center"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <div className={`${tooltip.previousPage && "tooltip__container"}`}>
            <IoCaretBackSharp
              onMouseEnter={() =>
                tooltipDispatch({
                  type: "previousPage",
                  tooltip: "Previous Page ",
                })
              }
              onMouseLeave={() => tooltipDispatch({ type: "clear", init: {} })}
              onClick={() =>
                dispatch({
                  type: "set_currentPage",
                  currentPage:
                    query.currentPage === 1
                      ? query.currentPage
                      : query.currentPage - 1,
                })
              }
              className={`${
                prevDisabled ? "text-gray-400" : "cp text-slate-700"
              }`}
            />
            {tooltip?.previousPage && (
              <Tooltip tagline={tooltip?.previousPage} />
            )}
          </div>
          <span className="text-xs text-white font-bold inline-grid px-2 py-[2px] bg-slate-500 place-items-center rounded-md">
            {query.currentPage}
          </span>
          <div className={`${tooltip.nextPage && "tooltip__container"}`}>
            <IoCaretForwardSharp
              onMouseEnter={() =>
                tooltipDispatch({
                  type: "nextPage",
                  tooltip: "Next Page",
                })
              }
              onMouseLeave={() => tooltipDispatch({ type: "clear", init: {} })}
              onClick={() =>
                dispatch({
                  type: "set_currentPage",
                  currentPage: query.currentPage + 1,
                })
              }
              className={`${
                nextDisabled ? "text-gray-400" : "cp text-slate-700"
              }`}
            />
            {tooltip?.nextPage && <Tooltip tagline={tooltip?.nextPage} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
