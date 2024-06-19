import React, { useState } from "react";
import Field from "../Field";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../../store/slices/userSlice";

const Modal = ({ show, closeModal }) => {
  const [newUserName, setNewUserName] = useState("");
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => state.user);
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
          <Field
            className="opacity"
            label="First Name"
            type="text"
            value={firstName}
            readOnly
          />
          <Field
            className="opacity"
            label="Last Name"
            type="text"
            value={lastName}
            readOnly
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
