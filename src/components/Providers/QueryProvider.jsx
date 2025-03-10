import React, { useReducer } from "react";
import queryReducer from "../../reducers/queryReducer";

export const QueryContext = React.createContext();
QueryContext.displayName = "QueryContext";

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
