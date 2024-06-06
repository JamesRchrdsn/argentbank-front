import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/argentBankLogo.webP";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

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
        {user ? (
          <div className="sign-out">
            <Link className="main-nav-item" to="/user">
              {" "}
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </Link>
            <Link onClick={handleLogout} className="main-nav-item" to="/">
              {" "}
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
