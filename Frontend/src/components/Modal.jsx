import { createPortal } from "react-dom";
import Button from "./Button";
import Overlay from "./Overlay";
import { RxCross2 } from "react-icons/rx";

import modalRegistry from "./modalRegistry";
import useModalStore from "../stores/modalStore";

const Modal = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const modalProps = useModalStore((s) => s.modalProps);

  const currentModal = useModalStore((s) => s.currentModal);

  if (!currentModal) return null;
  const ModalElement = modalRegistry[currentModal];

  return createPortal(
    <Overlay>
      <div className="-full">
        <div className="padding-box-sm mb-3.5" />
        <div className="modal  items-center">
          <span className="self-end">
            <Button bg onClick={closeModal} size="sm">
              <RxCross2 />
            </Button>
          </span>
          <section className="italic tracking-wider text-white">
            {ModalElement && <ModalElement {...modalProps} />}
          </section>
        </div>
      </div>
    </Overlay>,
    document.getElementById("portal")
  );
};

export default Modal;
