import React from "react";
import Button from "./Interactives/Button.js";
import { toast } from "sonner";
import useHabitStore from "../stores/habitStore.js";
import useModalStore from "../stores/modalStore.js";
import { MdCancel, MdDelete } from "react-icons/md";

const DeleteModal = React.memo(({ id }: { id: string }) => {
  const closeModal = useModalStore((s) => s.closeModal);
  const deleteHabit = useHabitStore((s) => s.deleteHabit);

  const onDelete = async () => {
    if (!id) return;

    try {
      await deleteHabit(id);
      toast.success("Habit deleted successfully !");
    } catch (ex: any) {
      const msg = ex?.msg ?? "Failed to delete habit";
      toast.error(msg);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="flex flex-col text-center font-bold">
      <h1 className="scale-75">Confirm habit deletion ?</h1>
      <div className="flex justify-evenly italic py-2">
        <Button onClick={closeModal} className="modal-btn-error">
          Cancel
          <MdCancel />
        </Button>
        <Button onClick={onDelete} className="modal-btn-success">
          Confitm
          <MdDelete />
        </Button>
      </div>
    </div>
  );
});

export default DeleteModal;
