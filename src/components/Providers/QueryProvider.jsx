import React, { useReducer } from "react";
import queryReducer from "../../reducers/queryReducer";
import QueryContext from "../../context/QueryContext";

const QueryProvider = ({ children }) => {
  const queryObject = {
    pageSize: 10,
    searchQuery: "",
    currentPage: 1,
    status: null,
  };
  const [query, dispatch] = useReducer(queryReducer, queryObject);

  return (
    <QueryContext.Provider value={{ query, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
