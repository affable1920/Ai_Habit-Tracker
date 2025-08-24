import Button from "./Button";
import { toast } from "sonner";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import useModalStore from "../stores/modalStore";
import useHabitStore from "../stores/habitStore";

const maxLength = 7;

const EditHabitModal = () => {
  const editHabit = useHabitStore((s) => s.editHabit);

  const closeModal = useModalStore((s) => s.closeModal);
  const modalProps = useModalStore((s) => s.modalProps);

  const handleEdit = async () => {
    const id = modalProps?.habitId ?? null;
    if (!id) return;

    try {
      await editHabit(id);
      const idSubStr = id.length > maxLength ? id.slice(0, maxLength) : id;

      const msg = `Habit with id: ${idSubStr}... successfully marked as completed.`;
      toast.success(msg);
    } catch (ex) {
      const msg = ex?.msg ?? "Failed to edit habit !";
      toast.error(msg);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center font-bold scale-75">Mark Complete ?</h1>
      <div className="italic flex justify-evenly py-2">
        <Button className="modal-btn-error" onClick={closeModal}>
          Cancel
          <MdCancel />
        </Button>
        <Button className="modal-btn-success" onClick={handleEdit}>
          Confirm
          <TiTick />
        </Button>
      </div>
    </div>
  );
};

export default EditHabitModal;
