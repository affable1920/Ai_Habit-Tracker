const queryReducer = (state, action) => {
  switch (action.type) {
    case "current_page_increment":
      return { ...state, currentPage: state.currentPage + 1 };

    case "current_page_decrement":
      return {
        ...state,
        currentPage: state.currentPage === 1 ? 1 : state.currentPage - 1,
      };

    case "set_searchQuery":
      let queryToSet = {
        ...state,
        searchQuery: action.searchQuery,
        currentPage: 1,
      };
      queryToSet.status && delete queryToSet.status;
      return queryToSet;

    case "set_pageSize":
      return {
        ...state,
        pageSize: action.pageSize,
        currentPage:
          state.currentPage === 1
            ? 1
            : action.pageSize > state.pageSize
            ? action?.maxPages - 1
            : Math.floor(action?.count / action.pageSize),
      };

    case "complete":
      return { ...state, status: action.type };

    case "incomplete":
      return { ...state, status: action.type };

    case "archived":
      return { showArchived: true };

    case "reset":
      return action.state;
  }
};

export default queryReducer;
