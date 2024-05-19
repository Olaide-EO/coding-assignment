import "../styles/modal.scss";
import useOutsideClick from "../utils/useOutsideClick";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";

const Modal = ({ onClose = () => null, hasCloseBtn = true, children }) => {
  const ref = useOutsideClick(onClose);

  return (
    <div className="modal-backdrop">
      <div ref={ref} className="popup-content">
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
  );
};

export default Modal;
