import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { ModalContext } from "./Providers/ModalProvider";
import RecommendationSystem from "./RecommendationSystem";
import useMutateHabit from "../hooks/useMutateHabit";
import Delete from "./Delete";
import useUpdateHabit from "../hooks/useUpdateHabit";
import Reminder from "./Reminder";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SearchBar from "./SearchBar";

const Modal = () => {
  const { modal, dispatch } = useContext(ModalContext);
  const { mutate } = useUpdateHabit();

  if (!modal?.openModal) return null;
  return createPortal(
    <div className="overlay">
      <div className={`modal relative`}>
        <RxCross2
          className="absolute cp icon__with__bg justify-self-end top-[6px] right-2"
          onClick={() => dispatch({ type: "CLOSE_MODAL" })}
        />
        {modal?.modalName === "SearchBox" && <SearchBar />}
        {modal?.modalName === "recommendationSystem" && (
          <RecommendationSystem />
        )}
        {modal?.modalName === "deleteModal" && <Delete />}
        {modal?.modalName === "editHabitModal" && (
          <button
            onClick={() => {
              mutate(modal.props.id);
              dispatch({ type: "CLOSE_MODAL" });
            }}
            className={`text-xs font-medium bg-color__accent__lighter p-2 rounded-md
                italic mt-4 shadow-md tracking-wider`}
          >
            Mark_complete
          </button>
        )}
        {modal?.modalName === "reminderModal" && <Reminder />}
        {modal?.modalName === "loginModal" && <LoginModal />}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
