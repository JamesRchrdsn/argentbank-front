import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/argentBankLogo.webP";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName } = useSelector((state) => state.user);
  const token = useSelector(
    (state) => state.user.token || localStorage.getItem("token")
  );

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        {userName ? (
          <div className="sign-out">
            <Link className="main-nav-item" to="/profile">
              {" "}
              <i className="fa fa-user-circle"></i>
              {userName}
            </Link>
            <Link onClick={handleLogout} className="main-nav-item" to="/">
              {" "}
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        ) : (
          <Link className="main-nav-item" to={token ? "/profile" : "/sign-in"}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
