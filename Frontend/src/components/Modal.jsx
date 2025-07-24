import { useContext } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { ModalContext } from "./Providers/ModalProvider";
import Overlay from "./Overlay";
import useHabitStore from "../stores/habitStore";
import { toast } from "sonner";
import IconComponent from "./IconComponent";
import UserActions from "./UserActions";
import { TiTick } from "react-icons/ti";

const Modal = () => {
  const { modals, dispatch } = useContext(ModalContext);

  const closeModal = () => {
    dispatch({ type: "CLOSE_ALL" });
  };

  const editHabit = useHabitStore((s) => s.editHabit);
  const deleteHabit = useHabitStore((s) => s.deleteHabit);

  const onEdit = async () => {
    const { success, msg } = await editHabit(
      modals.props.habitId,
      modals.props.fieldsToUpdate
    );

    if (!success) {
      toast.error(msg);
      return;
    }

    toast.success(msg);
    dispatch({ type: "CLOSE_MODAL", name: "editHabit" });
  };

  if (modals.open.length === 0) return null;

  const modalMap = {
    user_action: <UserActions />,
    edit_habit: (
      <button
        onClick={onEdit}
        className="btn btn__accent flex items-center gap-2"
      >
        Mark Complete <TiTick />
      </button>
    ),
    delete_modal: (
      <button
        onClick={() => deleteHabit(modals.props.habitId)}
        className="btn btn__accent"
      >
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
          {modalMap[modals.open[modals.open.length - 1]]}
        </div>
      </div>
    </Overlay>,
    document.getElementById("portal")
  );
};

export default Modal;
