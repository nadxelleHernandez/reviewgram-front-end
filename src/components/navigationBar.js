import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Login from "./login";

const NavigationBar = ({ user_id, authenticated, handleLogin }) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleClose = () => {
    setShowLogin(false);
  };

  const doLogin = (loginInfo) => {
    console.log("I'm handling login");
    handleLogin(loginInfo);
    setShowLogin(false);
  };

  const onSelectNav = (eventKey) => {
    if (eventKey === "login") {
      setShowLogin(true);
    }
  };

  return (
    <div>
      <Navbar bg="primary" expand="sm" variant="dark" onSelect={onSelectNav}>
        <Container>
          <Navbar.Brand>ReviewGram</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav">
              <Nav.Link eventKey="home" as={Link} to={"/"}>
                Home
              </Nav.Link>
              {authenticated === true && (
                <Nav.Link
                  eventkey="my-lists"
                  as={Link}
                  to={`/UserList/${user_id}`}
                >
                  My Lists
                </Nav.Link>
              )}
              {authenticated === false && (
                <Nav.Link eventKey="login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login
        doShow={showLogin}
        handleLogin={doLogin}
        handleClose={handleClose}
      ></Login>
    </div>
  );
};

export default NavigationBar;
