import React from "react";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import useHabits from "../hooks/useHabits";
import queryStore from "../stores/queryStore";

const Pagination = () => {
  const { data } = useHabits();

  const { query, setPageSize, setPage } = queryStore();
  const { currentPage, pageSize } = query;

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
        className="flex items-center rounded-md px-2 gap-2 bg-zinc-50 py-1 border-[1.5px] border-slate-200 
        dark:bg-secondary__lighter dark:border-accent"
      >
        <div className="text-xs font-semibold tracking-wide flex items-center font-mono">
          <label htmlFor="pageSize">Showing:</label>
          <select
            onChange={(e) => setPageSize(parseInt(e.target.value))}
            name="pageSize"
            value={query.pageSize}
            className="cp rounded-md ml-1 outline-none p-[2px] text-center border-[1.4px] 
            border-slate-200 dark:bg-secondary__lighter dark:border-accent mr-1"
          >
            {optionMap.map(({ value }) => (
              <option key={value} value={value} disabled={value > data?.count}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <IoCaretBackSharp
            onClick={() =>
              setPage(prevDisabled ? currentPage : currentPage - 1)
            }
          />
          <span
            className="text-xs font-mono font-bold inline-grid px-1 py-[2px] bg-slate-300 dark:bg-accent 
            place-items-center rounded-md"
          >
            {currentPage}
          </span>
          <IoCaretForwardSharp
            onClick={() =>
              setPage(nextDisabled ? currentPage : currentPage + 1)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
