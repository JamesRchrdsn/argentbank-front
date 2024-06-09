import React from "react";
import "./modal.css";

const Modal = ({ show, handleClose, children }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
