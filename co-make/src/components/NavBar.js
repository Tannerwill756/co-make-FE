import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../images/logo_transparent.png";
import "./styling/navStyling.css";
import { logoutAction } from "../store/actions/actions";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const NavBar = (props) => {
  function handleLogout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("token");
    props.logoutAction();
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" href="/issues">
          Home
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" href="/issueform">
          New Issue
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          href={`/profile/${localStorage.getItem("user_id")}`}
        >
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          href="/login"
          onClick={() => handleLogout()}
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navLinks">
      <div className="logo">
        <a href={props.signedIn ? "/issues" : "/"}>
          <img src={logo} alt="comake-logo" />
        </a>
      </div>
      <nav>
        {props.signedIn ? <p>Hello, {props.username}</p> : ""}
        {props.signedIn ? null : (
          <div>
            <Link className="link" to="/register">
              {" "}
              Register{" "}
            </Link>

            <Link className="link" to="/login">
              {" "}
              Login
            </Link>
          </div>
        )}
        {props.signedIn ? (
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              href="/#"
            >
              Menu <DownOutlined />
            </a>
          </Dropdown>
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
