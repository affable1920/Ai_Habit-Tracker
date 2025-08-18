import React from "react";
import Button from "./Button";
import useHabitStore from "../stores/habitStore";
import useModalStore from "../stores/modalStore";
import { MdCancel, MdDelete } from "react-icons/md";

const DeleteModal = React.memo(({ ...rest }) => {
  const closeModal = useModalStore((s) => s.closeModal);
  const deleteHabit = useHabitStore((s) => s.deleteHabit);

  const id = rest?.habitId;

  const onDelete = async () => {
    if (!id) return;

    try {
      await deleteHabit(id);
    } catch (ex) {
    } finally {
      closeModal();
    }
  };

  return (
    <div>
      <p>Confirm habit deletion ?</p>
      <div className="flex justify-around mt-4">
        <Button bg onClick={closeModal} icon={MdCancel} />
        <Button bg icon={MdDelete} onClick={onDelete} />
      </div>
    </div>
  );
});

export default DeleteModal;
