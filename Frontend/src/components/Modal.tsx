import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

import Button from "./Interactives/Button.js";
import Overlay from "./Overlay.js";

import modalRegistry from "./modalRegistry.js";
import useModalStore from "../stores/modalStore.js";

const Modal = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const modalProps = useModalStore((s) => s.modalProps);

  const currentModal = useModalStore((s) => s.currentModal);

  if (!currentModal) return null;
  const ModalElement = modalRegistry[currentModal];

  const portal = document.getElementById("portal");
  if (!portal) return;

  return createPortal(
    <Overlay alpha="A">
      <div className="modal">
        <Button onClick={closeModal} className="self-end p-0.5">
          <RxCross2 />
        </Button>
        {ModalElement && <ModalElement {...modalProps} />}
      </div>
    </Overlay>,
    portal
  );
};

export default Modal;
