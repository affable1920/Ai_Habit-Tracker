import React, { useReducer } from "react";
import queryReducer from "../../reducers/queryReducer";
import QueryContext from "../../context/QueryContext";

const QueryProvider = ({ children }) => {
  const queryObject = {
    pageSize: 10,
    currentPage: 1,
  };

  const [query, dispatch] = useReducer(queryReducer, queryObject);
  return (
    <QueryContext.Provider value={{ query, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
