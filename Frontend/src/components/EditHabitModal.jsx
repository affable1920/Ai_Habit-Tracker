import Button from "./Button";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";

const EditHabitModal = () => {
  return (
    <div className="flex justify-between items-center">
      <Button>
        <MdCancel />
      </Button>
      <Button>
        <TiTick />
      </Button>
    </div>
  );
};

export default EditHabitModal;
