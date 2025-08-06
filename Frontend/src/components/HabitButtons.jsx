import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiCollapseHorizontalFill } from "react-icons/ri";
import useModalStore from "../stores/modalStore";
import { MODALS } from "../../constants/MODALS";

const HabitButtons = ({ onDropdownClick, habit }) => {
  const { openModal } = useModalStore();

  const onExtra = () => {
    openModal(MODALS.HABIT_DETAILS, {
      props: { habit },
    });
  };

  return (
    <div className="flex items-center gap-2 relative">
      <RiCollapseHorizontalFill className="icon__with__bg" onClick={onExtra} />
      <IoMdArrowDropdown className="icon__with__bg" onClick={onDropdownClick} />
      <MdDelete
        onClick={() =>
          openModal({
            name: MODALS.DELETE_CONFIRM,
            props: { habitId: habit.id },
          })
        }
        className="icon__with__bg"
      />
      {/* <HabitOptions habit={habit} /> */}
    </div>
  );
};

export default HabitButtons;
