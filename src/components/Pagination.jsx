import React, { useContext, useState } from "react";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import useHabits from "../hooks/useHabits";
import { QueryContext } from "./Providers/QueryProvider";

const Pagination = () => {
  const { query: { pageSize, currentPage } = {}, dispatch } =
    useContext(QueryContext);

  const { data } = useHabits();

  const prevDisabled = currentPage === 1;
  const nextDisabled =
    currentPage === data?.maxPages || data?.habits?.length < pageSize;

  const optionMap = [
    { value: 10 },
    { value: 15 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
  ];

  return (
    <div className="flex justify-end mt-6 justify-self-end self-end">
      <div
        className="flex items-center rounded-md px-2 gap-2 bg-slate-50 py-1 border-[1px] 
      border-slate-300 dark:border-slate-700 dark:bg-inherit"
      >
        <div className="text-xs font-semibold tracking-wide flex items-center font-mono">
          <label htmlFor="pageSize">Showing:</label>
          <select
            onChange={(e) =>
              dispatch({
                type: "set_pageSize",
                pageSize: parseInt(e.target.value),
                maxPages: data?.maxPages,
                count: data?.count,
              })
            }
            name="pageSize"
            value={pageSize}
            className="cp rounded-md ml-1 outline-none p-[2px] text-center border-[1px] 
            border-slate-300 dark:bg-slate-800 dark:border-slate-700 mr-1"
          >
            {optionMap.map(({ value }) => (
              <option key={value} value={value} disabled={value > data?.count}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <IoCaretBackSharp
            onClick={() =>
              dispatch({
                type: "current_page_decrement",
              })
            }
            className={`${
              prevDisabled
                ? "text-slate-300 dark:text-slate-700 pointer-events-none"
                : "cp text-slate-700 dark:text-slate-300"
            }`}
          />
          <span
            className="text-xs font-mono font-bold inline-grid px-2 py-[2px] bg-slate-300 dark:bg-slate-800 
            place-items-center rounded-md"
          >
            {currentPage}
          </span>
          <IoCaretForwardSharp
            onClick={() =>
              dispatch({
                type: "current_page_increment",
              })
            }
            className={`${
              nextDisabled
                ? "text-slate-300 dark:text-slate-700 pointer-events-none"
                : "cp text-slate-700 dark:text-slate-300"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
