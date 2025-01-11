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
      <div
        className="flex items-center rounded-md px-2 gap-2 bg-slate-50 py-1 border-[1px] 
      border-slate-300 dark:border-slate-700 dark:bg-inherit"
      >
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
            className=" cp rounded-md ml-2 outline-none p-[2px] text-center border-[1px] 
            border-slate-300 dark:bg-slate-800 dark:border-slate-700"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
        </div>
        <div className="flex items-center">
          <div className={`${tooltip?.previousPage && "tooltip__container"}`}>
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
                prevDisabled
                  ? "text-slate-300 dark:text-slate-700"
                  : "cp text-slate-700 dark:text-slate-300"
              }`}
            />
            {tooltip?.previousPage && (
              <Tooltip tagline={tooltip?.previousPage} />
            )}
          </div>
          <span
            className="text-xs font-mono font-bold inline-grid px-2 py-[2px] bg-slate-300 dark:bg-slate-800 
            place-items-center rounded-md"
          >
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
                nextDisabled
                  ? "text-slate-300 dark:text-slate-700"
                  : "cp text-slate-700 dark:text-slate-300"
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
