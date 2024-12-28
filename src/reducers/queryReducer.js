const queryReducer = (state, action) => {
  const init = state;
  switch (action.type) {
    case "set_currentPage":
      return { ...state, currentPage: action.currentPage };

    case "set_searchQuery":
      return {
        ...state,
        searchQuery: action.searchQuery,
        currentPage: action.currentPage,
      };

    case "set_pageSize":
      return { ...state, pageSize: action.pageSize };

    case "reset":
      return action.state;
  }
};

export default queryReducer;
