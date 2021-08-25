import React from "react";
import styled from "styled-components";
import Logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import dev from "../../config/dev.json";
import { connect } from "react-redux";

const NavbarContainer = styled.div`
  background: #277;
  .nav-link {
    color: #fff !important;
    &:hover {
      background: #299;
    }
  }
`;

export const Navbar = (props) => {
  const Logout = async () => {
    console.log("logout", localStorage.getItem("token"));
    try {
      const body = {
        token: localStorage.getItem("token"),
      };
      await axios.post(`${dev.baseURL}/users/logout`, { ...body }).then(() => {
        localStorage.removeItem("token");
        window.location.reload()
      });
    } catch (e) {}
  };
  return !localStorage.getItem("token") ? (
    <NavbarContainer>
      <nav className="navbar navbar-expand-lg navbar-light ms-3">
        <Link className="navbar-brand " to="#">
          <img
            className="rounded-circle"
            src={Logo}
            style={{ width: "50px" }}
            alt="random"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse m-10 d-inline"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto me-4 ">
            <li className="nav-item active d-inline">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item d-inline">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item d-inline">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </NavbarContainer>
  ) : (
    <NavbarContainer>
      <nav className="navbar navbar-expand-lg navbar-light ms-3">
        <Link className="navbar-brand " to="#">
          <img
            className="rounded-circle"
            src={Logo}
            style={{ width: "50px" }}
            alt="random"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse m-10 d-inline"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto me-4 ">
            <li className="nav-item active d-inline">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item d-inline">
              <Link className="nav-link" to="/add-article">
                Add Article
              </Link>
            </li>

            <li className="nav-item d-inline">
              <Link className="nav-link" to="/profile">
                My Profile
              </Link>
            </li>
            <li className="nav-item d-inline">
              <Link className="nav-link" to="/" onClick={Logout}>
                Logout
              </Link>
            </li>
            <li className="nav-item d-inline">
              <Link className="nav-link" to="/my-article">
                Your Articles
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </NavbarContainer>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.user,
  };
};

export default connect(mapStateToProps, null)(Navbar);
