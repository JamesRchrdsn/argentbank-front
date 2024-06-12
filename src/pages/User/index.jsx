import React from "react";
import Profil from "../../components/Profil";
import AccountSection from "../../components/AccountSection";

const User = () => {
  return (
    <>
      <main className="main bg-dark">
        <Profil />
        <h2 className="sr-only">Accounts</h2>
        <AccountSection
          title="Argent Bank Checking(x8349)"
          amount="$2,082.79"
          description="Available Balance"
          buttonText="View transactions"
          buttonClass="transaction-button"
        />
        <AccountSection
          title="Argent Bank Savings(x6712)"
          amount="$10,928.42"
          description="Available Balance"
          buttonText="View transactions"
          buttonClass="transaction-button"
        />
        <AccountSection
          title="Argent Bank Checking(x8349)"
          amount="$184.30"
          description="Available Balance"
          buttonText="View transactions"
          buttonClass="transaction-button"
        />
      </main>
    </>
  );
};

export default User;
