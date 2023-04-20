import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSignInAlt,
  faUserPlus,
  faHome,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import siteLogo from "../../siteLogo.png";

const Header = ({ isAuth, setIsAuth }) => {
  const Logout = () => {
    localStorage.removeItem("userInfo");
    setIsAuth(false);
  };
  return (
    <>
      <Navbar className=" py-2" bg="dark" expand="lg" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand className="ms-3 ">
            <div className="d-flex text-center justify-content-center align-items-center ">
              <img src={siteLogo} style={{ height: "60px" }} alt="edumatric" />
              <h1 className="site-title">7Book</h1>
            </div>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-3">
            <LinkContainer to="/">
              <Nav.Link className="px-3">
                <FontAwesomeIcon icon={faHome} />
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/addpost">
              <Nav.Link className="px-3">
                <FontAwesomeIcon icon={faPlus} />
                Add Post
              </Nav.Link>
            </LinkContainer>
            {isAuth ? (
              <div className="d-flex">
                <Nav.Link className="px-3" onClick={() => Logout()}>
                  {" "}
                  <FontAwesomeIcon icon={faSignInAlt} />
                  Logout
                </Nav.Link>
                <LinkContainer to="/myrequests">
                  <Nav.Link className="px-3">
                    {" "}
                    <FontAwesomeIcon icon={faDatabase} />
                    My Requests
                  </Nav.Link>
                </LinkContainer>
              </div>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="px-3">
                    {" "}
                    <FontAwesomeIcon icon={faSignInAlt} />
                    Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="px-3">
                    {" "}
                    <FontAwesomeIcon icon={faUserPlus} />
                    Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
