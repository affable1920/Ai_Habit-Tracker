const tooltipReducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return { ...state, reset: action.tooltip, type: action.type };

    case "previousPage":
      return {
        ...state,
        previousPage: action.tooltip,
        type: action.type,
      };

    case "nextPage":
      return { ...state, nextPage: action.tooltip, type: action.type };

    case "delete":
      return { ...state, delete: action.tooltip, type: action.type };

    case "clear":
      return action.init;
  }
};

export default tooltipReducer;
