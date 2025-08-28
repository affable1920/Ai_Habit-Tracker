import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

import Button from "./Button";
import Overlay from "./Overlay";

import modalRegistry from "./modalRegistry";
import useModalStore from "../stores/modalStore";

const Modal = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const modalProps = useModalStore((s) => s.modalProps);

  const currentModal = useModalStore((s) => s.currentModal);

  if (!currentModal) return null;
  const ModalElement = modalRegistry[currentModal];

  document.addEventListener("click", (ev) => {
    if (currentModal && ev.target?.classList?.contains("overlay")) closeModal();
  });

  return createPortal(
    <Overlay alpha="A">
      <div className="modal">
        <Button onClick={closeModal} className="self-end p-0.5">
          <RxCross2 />
        </Button>
        {ModalElement && <ModalElement {...modalProps} />}
      </div>
    </Overlay>,
    document.getElementById("portal")
  );
};

export default Modal;
