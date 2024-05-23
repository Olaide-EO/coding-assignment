import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import "../styles/modal.scss";

const mountElement = document.getElementById("overlays");

const Modal = ({ onClose = () => null, hasCloseBtn = true, children }) => {
  const ref = useOutsideClick(onClose);

  return (
    <>
      {createPortal(
        <div className="modal-backdrop">
          <div ref={ref} className="popup-content" data-testid="preview-modal">
            {hasCloseBtn && (
              <button
                type="button"
                onClick={onClose}
                className="modal-cancel-btn"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            )}
            {children}
          </div>
        </div>,
        mountElement
      )}
    </>
  );
};

export default Modal;