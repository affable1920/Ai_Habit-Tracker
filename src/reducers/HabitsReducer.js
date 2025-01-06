const HabitsReducer = (habits, action) => {
  switch (action.type) {
    case "INIT":
      return action.initialData;

    case "DELETE":
      return habits.filter((habit) => habit.id !== action.habitId);
  }
};

export default HabitsReducer;
