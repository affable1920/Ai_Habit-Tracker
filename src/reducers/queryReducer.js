const queryReducer = (state, action) => {
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
      return { ...state, pageSize: parseInt(action.pageSize) };

    case "reset":
      return action.state;
  }
};

export default queryReducer;
