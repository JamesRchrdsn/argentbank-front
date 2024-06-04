import React from "react";

const Feature = ({ icon, title, children }) => (
  <div className="feature-item">
    <img src={icon} alt={`${title} Icon`} className="feature-icon" />
    <h3 className="feature-item-title">{title}</h3>
    <p>{children}</p>
  </div>
);

export default Feature;
