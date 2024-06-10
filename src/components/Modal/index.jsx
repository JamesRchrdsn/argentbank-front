import React, { useState } from "react";
import Field from "../Field";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { updateUserName } from "../../store/slices/userSlice";

const Modal = ({ show, closeModal }) => {
  const [newUserName, setNewUserName] = useState("");
  const dispatch = useDispatch();
  const modalClass = show ? "modal show" : "modal";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserName(newUserName));
    closeModal();
  };

  return (
    <div className={modalClass}>
      <div className="modal-content">
        <h2>Edit User Name</h2>
        <form onSubmit={handleSubmit}>
          <Field
            label="New User Name"
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
            autoComplete="off"
          />
          <Button type="submit" className="edit-button">
            Update
          </Button>
          <Button type="button" onClick={closeModal} className="cancel-button">
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
