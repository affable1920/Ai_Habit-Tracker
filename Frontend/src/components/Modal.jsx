import { createPortal } from "react-dom";
import Overlay from "./Overlay";
import useHabitStore from "../stores/habitStore";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import IconComponent from "./IconComponent";
import UserActions from "./UserActions";
import useModalStore from "../stores/modalStore";

const Modal = () => {
  const { currentModal, closeModal } = useModalStore();

  const editHabit = useHabitStore((s) => s.editHabit);
  const deleteHabit = useHabitStore((s) => s.deleteHabit);

  if (!currentModal) return null;

  const modalMap = {
    userActions: <UserActions />,
    editHabit: (
      <button
        onClick={editHabit}
        className="btn btn__accent flex items-center gap-2"
      >
        Mark Complete <TiTick />
      </button>
    ),
    deleteModal: (
      <button onClick={deleteHabit} className="btn btn__accent">
        Confirm Deletion ?
      </button>
    ),
  };

  return createPortal(
    <Overlay>
      <div className="wrapper__full">
        <div className="pad__box" />
        <div className="modal flex flex-col gap-4" style={{ zIndex: 100000 }}>
          <div className="self-end">
            <IconComponent
              bg
              Icon={RxCross2}
              fn={closeModal}
              pClass="ring-secondary-lighter/60"
              chClass="icon__small font-bold text-light"
            />
          </div>
          {modalMap[currentModal]}
        </div>
      </div>
    </Overlay>,
    document.getElementById("portal")
  );
};

export default Modal;
