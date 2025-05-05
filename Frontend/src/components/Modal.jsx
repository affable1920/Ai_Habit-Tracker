import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { LuAudioLines } from "react-icons/lu";
import { ModalContext } from "./Providers/ModalProvider";
import RecommendationSystem from "./RecommendationSystem";
import Delete from "./Delete";
import Overlay from "./Overlay";
import LoginModal from "./LoginModal";
import useHabitStore from "./habitStore";
import AddHabitComponent from "./AddHabitComponent";
import { toast } from "sonner";
import Reminder from "./Reminder";
import MainSearch from "./MainSearch";
import Habitdetails from "./Habitdetails";

const Modal = () => {
  const { modal, dispatch } = useContext(ModalContext);

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
      name: modal.openModals[modal.openModals.length - 1],
      props:
        modal.openModals[modal.openModals.length - 1] === "reminderModal"
          ? { modalName: "reminderModal", action: "CLOSE" }
          : {},
    });
  };

  const editHabit = useHabitStore((s) => s.editHabit);
  if (!modal.openModals || modal?.openModals?.length === 0) return null;

  const onEdit = async () => {
    const { success, msg } = await editHabit(
      modal.props.habitId,
      modal.props.fieldsToUpdate
    );

    if (!success) {
      toast.error(msg);
      return;
    }

    toast.success(msg);
    dispatch({ type: "CLOSE_MODAL", name: "editHabit" });
  };

  const modalMap = {
    habitDetails: <Habitdetails />,
    searchBox: <MainSearch />,
    recommendationSystem: <RecommendationSystem />,

    deleteModal: <Delete />,
    editHabit: (
      <button
        onClick={onEdit}
        className={`btn btn__accent italic tracking-wider`}
      >
        Mark_complete
      </button>
    ),

    loginModal: <LoginModal />,
    reminderModal: <Reminder />,

    addModal: <AddHabitComponent />,
    errorModal: (
      <>
        <div
          className="italic text-xs dark:bg-secondary__lighter p-4 rounded-md border-2 border-slate-100 
        dark:border-accent shadow-md dark:shadow-black tracking-wide"
        >
          <div className="shadow-md dark:shadow-black p-2 rounded-md bg-green-600 text-white">
            {modal.props.message}
            <LuAudioLines className="justify-self-end icon__with__bg text-black cp" />
          </div>
          <div className="flex justify-around mt-6 mb-1">
            <button className="btn btn__accent">Cancel</button>
            <button className="btn btn__accent">Add</button>
          </div>
        </div>
      </>
    ),
  };

  return createPortal(
    modal.openModals.map((mod, index) => (
      <Overlay>
        <div className="relative modal" style={{ zIndex: index + 1000 }}>
          <RxCross2
            className="absolute cp icon__with__bg justify-self-end right-[6px] top-[6px]"
            onClick={closeModal}
          />
          {modalMap[mod]}
        </div>
      </Overlay>
    )),
    document.getElementById("portal")
  );
};

export default Modal;
