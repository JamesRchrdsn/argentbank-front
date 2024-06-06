import React from "react";

const Field = ({ label, type, value, onChange }) => (
  <div className="input-wrapper">
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
);

export default Field;
