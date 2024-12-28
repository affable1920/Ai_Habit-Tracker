import React, { useReducer, useState } from "react";
import queryReducer from "../reducers/queryReducer";
import habitsData from "../data/mockData.json";
import Tooltip from "./Tooltip";
import Habit from "./Habit";
import paginate from "../services/paginate";
import { IoIosClose } from "react-icons/io";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import { BiReset } from "react-icons/bi";

const HabitsDash = () => {
  const taglines = {
    reset: "Reset all filters",
    nextPage: "Next Page",
    previousPage: "Previous Page",
    delete: "Delete Habit",
  };
  const queryObject = {
    pageSize: 10,
    searchQuery: "",
    currentPage: 1,
  };
  const [habits, setHabits] = useState(
    Object.entries(habitsData).map(([id, habit]) => ({
      id,
      ...habit,
    }))
  );
  const [tooltip, setTooltip] = useState({});
  const [query, dispatch] = useReducer(queryReducer, queryObject);

  let searchedHabits = habits;
  searchedHabits = !!query.searchQuery
    ? habits.filter(({ habit_name: name }) =>
        name
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase()
          .includes(
            query.searchQuery.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
          )
      )
    : habits;

  const paginated = paginate(query.currentPage, query.pageSize, searchedHabits);

  const prevDisabled = query.currentPage === 1;
  let nextDisabled = paginated.length < query.pageSize;

  const handleMouseEnter = (type) => {
    setTooltip({ [type]: [taglines[type]] });
    setTimeout(() => {
      setTooltip({});
    }, 1400);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setTooltip({});
    }, 250);
  };

  return (
    <>
      <h1 className="font-black mt-2 md:mt-3 text-center tracking-wide text-2xl text-color__primary">
        Habits Dashboard
      </h1>
      <div className="p-3 grid xl:grid-cols-2 px-10 mt-6">
        <div className="flex flex-col justify-center border-[2px] border-slate-300 rounded-md p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center relative justify-between">
              <input
                onChange={(e) => {
                  dispatch({
                    type: "set_searchQuery",
                    searchQuery: e.target.value,
                    currentPage: 1,
                  });
                }}
                value={query.searchQuery}
                placeholder="Search for a habit!"
                className="px-4 py-2 rounded-md transition-colors placeholder:text-xs tracking-wide bg-slate-50 ring-1 ring-slate-300
                 font-semibold text-sm outline-none hover:focus:bg-slate-100"
              />
              <div className="flex items-center absolute right-0 mr-2">
                {!!query.searchQuery ? (
                  <IoIosClose
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch({
                        type: "set_searchQuery",
                        searchQuery: "",
                        currentPage: 1,
                      })
                    }
                  />
                ) : null}
              </div>
            </div>
            <div className={`${tooltip && "tooltip__container"}`}>
              <BiReset
                onMouseEnter={() => handleMouseEnter("reset")}
                onMouseLeave={handleMouseLeave}
                className="cp"
                onClick={() => dispatch({ type: "reset", state: queryObject })}
              />
              {tooltip.reset && <Tooltip tagline={tooltip.reset} />}
            </div>
          </div>
          <section className="mt-4 table">
            {paginated.map((habit) => (
              <Habit
                key={habit.habit_id}
                habit={habit}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                tooltipTagline={tooltip.delete}
              />
            ))}
          </section>
          <div className="self-end flex items-center gap-2 mt-2">
            <div className="flex items-center gap-2 bg-slate-200 px-2 py-1 rounded-md ring-1 ring-slate-300">
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
                  className="bg-slate-200 cursor-pointer ml-2 outline-none text-indigo-700 rounded-sm"
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`${tooltip.previousPage && "tooltip__container"}`}
                >
                  <IoCaretBackSharp
                    onMouseEnter={() => handleMouseEnter("previousPage")}
                    onMouseLeave={handleMouseLeave}
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
                      prevDisabled ? "text-gray-400" : "cp text-slate-800"
                    }`}
                  />
                  {tooltip.previousPage && (
                    <Tooltip tagline={tooltip.previousPage} />
                  )}
                </div>
                <span className="text-xs font-black inline-flex w-6 h-6 bg-gray-300 justify-center items-center rounded-md">
                  {query.currentPage}
                </span>
                <div className={`${tooltip.nextPage && "tooltip__container"}`}>
                  <IoCaretForwardSharp
                    onMouseEnter={() => handleMouseEnter("nextPage")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() =>
                      dispatch({
                        type: "set_currentPage",
                        currentPage: query.currentPage + 1,
                      })
                    }
                    className={`${
                      nextDisabled ? "text-gray-400" : "cp text-slate-800"
                    }`}
                  />
                  {tooltip.nextPage && <Tooltip tagline={tooltip.nextPage} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HabitsDash;
