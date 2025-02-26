import React, { useState } from "react";
import useMutateHabit from "./../hooks/useMutateHabit";
import Modal from "./Modal";
import { MdDelete } from "react-icons/md";

const DeleteIcon = ({ habitId }) => {
  const { mutate } = useMutateHabit();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      {showDeleteModal && (
        <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <div
            className="bg-color__accent__lighter/55 dark:bg-slate-300 text-black p-3 rounded-lg mt-2 font-medium 
          tracking-wide"
          >
            <p>Confirm habit deletion ?</p>
            <div className="flex justify-around mt-4">
              <button
                className="btn btn__primary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn__primary"
                onClick={() => {
                  mutate({ action: "delete", habitId });
                  setShowDeleteModal(false);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
      <MdDelete
        onClick={() => setShowDeleteModal(true)}
        className="icon__with__bg"
      />
    </>
  );
};

export default DeleteIcon;
