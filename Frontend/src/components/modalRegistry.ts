import EditHabitModal from "./EditHabitModal.js";
import DeleteModal from "./DeleteModal.js";
import UserActions from "./UserActions.js";

const modalRegistry = {
  USER_ACTIONS: UserActions,
  EDIT_HABIT: EditHabitModal,
  DELETE_CONFIRM: DeleteModal,
};

export default modalRegistry;
