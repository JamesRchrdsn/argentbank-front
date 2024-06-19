import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  login,
  setRememberMe,
} from "../../store/slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Field from "../Field";
import Checkbox from "../Checkbox";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error, rememberMe } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(rememberMe);

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [navigate, token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(fetchProfile(storedToken));
      if (rememberMe) {
        navigate("/profile");
      }
    }
  }, [dispatch, navigate, rememberMe]);

  const handleRememberChange = () => {
    setRemember(!remember);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      login({ email, password, rememberMe: remember })
    );
    if (login.fulfilled.match(resultAction)) {
      if (remember) {
        dispatch(setRememberMe(true));
        localStorage.setItem("token", resultAction.payload.token);
      } else {
        dispatch(setRememberMe(false));
        // localStorage.removeItem("token");
      }
      navigate("/profile");
    } else {
      console.error("Failed to login", resultAction.payload);
    }
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
          <Checkbox
            checked={remember}
            onChange={handleRememberChange}
            label="Remember me"
          />
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
