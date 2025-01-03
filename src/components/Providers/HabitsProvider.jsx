import React, { useReducer } from "react";
import HabitsContext from "../../context/HabitsContext";
import HabitsReducer from "../../reducers/HabitsReducer";
import habitsData from "../../data/mockData.json";

const HabitsProvider = ({ children }) => {
  const [habits, dispatch] = useReducer(
    HabitsReducer,
    Object.entries(habitsData).map(([id, habit]) => ({
      id,
      ...habit,
    }))
  );

  return (
    <HabitsContext.Provider value={{ habits, dispatch }}>
      {children}
    </HabitsContext.Provider>
  );
};

export default HabitsProvider;
