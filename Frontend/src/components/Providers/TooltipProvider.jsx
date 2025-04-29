import React, { useReducer } from "react";
import TooltipContext from "../../context/TooltipContext";
import tooltipReducer from "../../reducers/tooltipReducer";

const TooltipProvider = ({ children }) => {
  const [tooltip, dispatch] = useReducer(tooltipReducer, {});

  return (
    <TooltipContext.Provider value={{ tooltip, dispatch }}>
      {children}
    </TooltipContext.Provider>
  );
};

export default TooltipProvider;
