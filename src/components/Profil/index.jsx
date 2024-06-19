import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import Button from "../Button";

const Profil = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { firstName, lastName } = useSelector((state) => state.user);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="profile-header">
      <h1>Welcome back,</h1>
      <h1>
        {firstName} {lastName}!
      </h1>
      <Button className="edit-button" onClick={openModal}>
        Edit Name
      </Button>
      <Modal show={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Profil;
