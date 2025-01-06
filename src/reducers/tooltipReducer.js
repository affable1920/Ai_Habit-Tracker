const tooltipReducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return { reset: action.tooltip, type: action.type };

    case "previousPage":
      return {
        previousPage: action.tooltip,
        type: action.type,
      };

    case "nextPage":
      return { nextPage: action.tooltip, type: action.type };

    case "delete":
      return {
        delete: action.tooltip,
        type: action.type,
        id: action.id,
      };

    case "status":
      return { status: action.tooltip, type: action.type };

    case "clear":
      return {};
  }
};

export default tooltipReducer;
