import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setRememberMe } from "../../store/slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Field from "../Field";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setRememberMe(rememberMe));
    dispatch(login({ email, password, rememberMe })).then(() => {
      if (status === "succeeded") {
        navigate("/user");
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            required
            autoComplete="email"
          />
        </div>
        <div className="input-wrapper">
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRemember(!rememberMe)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {error && <p className="error">{error}</p>}
        <Button className="sign-in-button" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
