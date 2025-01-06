import React from "react";
import HabitsContext from "../../context/HabitsContext";

const HabitsProvider = ({ children }) => {
  return <HabitsContext.Provider value={{}}>{children}</HabitsContext.Provider>;
};

export default HabitsProvider;
