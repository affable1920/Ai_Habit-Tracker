import React from "react";

const QueryContext = React.createContext({
  pageSize: 10,
  searchQuery: "",
  currentPage: 1,
});
QueryContext.displayName = "QueryContext";

export default QueryContext;
