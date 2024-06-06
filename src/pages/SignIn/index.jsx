import React from "react";
import LoginForm from "../../components/Login";

const SignIn = () => (
  <React.Fragment>
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <LoginForm />
      </section>
    </main>
  </React.Fragment>
);

export default SignIn;
