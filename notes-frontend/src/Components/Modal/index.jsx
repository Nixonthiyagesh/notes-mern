import { memo } from "react";
import "./index.css";

const Modal = ({ title, children, onClose, toggle }) => {
  if (!toggle) return;

  return (
    <>
      <div className="backdrop" />
      <div className="modal-conatainer">
        <h2>{title}</h2>
        <span className="close-btn" onClick={onClose}>
          x
        </span>
        {children}
      </div>
    </>
  );
};

export default memo(Modal);
