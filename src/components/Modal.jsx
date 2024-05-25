import useOutsideClick from "../hooks/useOutsideClick";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import Portal from "./Portal";
import "../styles/modal.scss";

const Modal = ({
  onClose = () => null,
  hasCloseBtn = true,
  isVisible = false,
  children,
}) => {
  const ref = useOutsideClick(onClose);

  if (!isVisible) return null;

  return (
    <Portal>
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
      </div>
    </Portal>
  );
};

export default Modal;
