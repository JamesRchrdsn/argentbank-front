import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="title-error"> 404 - Page Not Found</h1>
      <p className="text-error">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link className="link-error" to="/">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
