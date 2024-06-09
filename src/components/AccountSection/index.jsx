import React from "react";
import Button from "../Button";

const AccountSection = ({
  title,
  amount,
  description,
  buttonText,
  buttonClass,
}) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <Button className={buttonClass} text={buttonText}>
          View transactions
        </Button>
      </div>
    </section>
  );
};

export default AccountSection;
