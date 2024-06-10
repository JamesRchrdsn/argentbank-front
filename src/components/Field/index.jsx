import React from "react";

const Field = ({
  label,
  type,
  value,
  onChange,
  onKeyDown,
  required,
  autoComplete,
}) => {
  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default Field;
