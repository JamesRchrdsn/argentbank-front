import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal";
import Button from "../Button";
import Field from "../Field";
import { updateUserName } from "../../store/slices/userSlice";

const Profil = () => {
  const [showModal, setShowModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleUpdateUsername = () => {
    dispatch(updateUserName(newUsername));
    setShowModal(false);
  };

  return (
    <div className="profile-header">
      <h1>Welcome back,</h1>
      <h1>{userName}!</h1>
      <Button className="edit-button" onClick={handleOpenModal}>
        Edit Name
      </Button>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>Edit Username</h2>
        <Field
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          onEnterPress={handleUpdateUsername}
        />
        <Button className="edit-button" onClick={handleUpdateUsername}>
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default Profil;
