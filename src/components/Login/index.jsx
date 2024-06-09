import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setRememberMe } from "../../store/slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      if (rememberMe) {
        dispatch(setRememberMe(true));
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }
      navigate("/user");
    } else {
      console.error("Failed to Login", resultAction.payload);
    }
  };
  return (
    <div>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => {
              setRemember(e.target.checked);
            }}
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
