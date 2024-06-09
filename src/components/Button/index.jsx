import React from "react";

const Button = ({ className, children, onClick }) => (
  <button className={className} onClick={onClick} type="submit">
    {children}
  </button>
);

export default Button;
