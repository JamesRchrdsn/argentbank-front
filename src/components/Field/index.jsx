import React from "react";

const Field = ({
  label,
  type,
  value,
  onChange,
  readOnly,
  onKeyDown,
  required,
  autoComplete,
  className,
}) => {
  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        className={className}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        onKeyDown={onKeyDown}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default Field;
