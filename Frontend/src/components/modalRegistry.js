import EditHabitModal from "./EditHabitModal";
import DeleteModal from "./DeleteModal";
import UserActions from "./UserActions";

const modalRegistry = {
  USER_ACTIONS: UserActions,
  EDIT_HABIT: EditHabitModal,
  DELETE_CONFIRM: DeleteModal,
};

export default modalRegistry;
