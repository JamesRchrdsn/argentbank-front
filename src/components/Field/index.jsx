import React from "react";

const Field = ({ label, type, value, onChange, onEnterPress }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onEnterPress();
    }
  };

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Field;
