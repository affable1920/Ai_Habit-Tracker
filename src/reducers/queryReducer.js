const queryReducer = (state, action) => {
  switch (action.type) {
    case "set_currentPage":
      return { ...state, currentPage: action.currentPage };

    case "set_searchQuery":
      return {
        ...state,
        searchQuery: action.searchQuery,
        currentPage: 1,
      };

    case "set_pageSize":
      return { ...state, pageSize: parseInt(action.pageSize) };

    case "status":
      return { ...state, status: action.status };

    case "reset":
      return action.state;
  }
};

export default queryReducer;
