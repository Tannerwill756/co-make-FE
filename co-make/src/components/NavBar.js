import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../images/logo_transparent.png";
import "./styling/navStyling.css";
import { logoutAction } from "../store/actions/actions";

const NavBar = (props) => {
  function handleLogout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("token");
    props.logoutAction();
  }
  return (
    <div className="navLinks">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="comake-logo" />
        </a>
      </div>
      <nav>
        {props.signedIn ? <p>Welcome, {props.username}</p> : ""}
        {props.signedIn ? null : (
          <Link className="link" to="/register">
            {" "}
            Register{" "}
          </Link>
        )}
        {props.signedIn ? (
          <Link className="link" to="/login" onClick={() => handleLogout()}>
            {" "}
            logout
          </Link>
        ) : (
          <Link className="link" to="/login">
            {" "}
            Login
          </Link>
        )}
        {props.signedIn ? (
          <Link className="link" to="/issueform">
            New Issue
          </Link>
        ) : null}
        {props.signedIn ? (
          <Link className="link" to="/issues">
            Home
          </Link>
        ) : null}
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.mainReducer.username,
    signedIn: state.mainReducer.signedIn,
  };
};

export default connect(mapStateToProps, { logoutAction })(NavBar);
