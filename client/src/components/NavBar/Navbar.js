import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const authLinks = (
    <ul>
      <li>
        <Link to="">Link</Link>
      </li>
      <li>
        <Link to="">Link</Link>
      </li>
      <li>
        <Link to="">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
    </ul>
  );
  
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {/* {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )} */}
    </nav>
  );
};

export default Navbar;