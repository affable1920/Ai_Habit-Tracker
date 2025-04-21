import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { ModalContext } from "./Providers/ModalProvider";
import RecommendationSystem from "./RecommendationSystem";
import Delete from "./Delete";
import Reminder from "./Reminder";
import LoginModal from "./LoginModal";
import SearchBar from "./SearchBar";
import AddHabitComponent from "./AddHabitComponent";
import Overlay from "./Overlay";
import { LuAudioLines } from "react-icons/lu";
import useHabitStore from "./habitStore";
import AuthContext from "../context/AuthContext";
import { toast } from "sonner";

const Modal = () => {
  const { modal, dispatch } = useContext(ModalContext);
  const { user } = useContext(AuthContext);

  const { editHabit } = useHabitStore();
  if (!modal.openModals || modal?.openModals?.length === 0) return null;

  const onEdit = async () => {
    try {
      const msg = await editHabit(
        user?.uid,
        modal.props.habitId,
        modal.props.fieldsToUpdate
      );

      toast.success(msg);
      dispatch({ type: "CLOSE_MODAL", name: "editHabit" });
    } catch (err) {
      toast.error("Error editing habit", {
        description: err,
      });
    }
  };

  const modalMap = {
    searchBar: <SearchBar />,
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

    reminderModal: <Reminder />,
    loginModal: <LoginModal />,

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
            onClick={() =>
              dispatch({
                type: "CLOSE_ALL",
                name: modal.openModals[modal.openModals.length - 1],
              })
            }
          />
          {modalMap[mod]}
        </div>
      </Overlay>
    )),
    document.getElementById("portal")
  );
};

export default Modal;
