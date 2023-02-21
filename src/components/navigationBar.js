import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Login from "./login";

const NavigationBar = ({ user, handleLogin, logOut }) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleClose = () => {
    setShowLogin(false);
  };

  const doLogin = (loginInfo) => {
    console.log("I'm handling login");
    handleLogin(loginInfo);
    setShowLogin(false);
  };

  const callLogOut = (event) => {
    logOut();
  };

  const callLogin = (event) => {
    setShowLogin(true);
  };

  return (
    <div>
      <Navbar bg="primary" expand="sm" variant="dark">
        <Container>
          <Navbar.Brand>ReviewGram</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="nav">
              <Nav.Link eventKey="home" as={Link} to={"/"}>
                Home
              </Nav.Link>

              {user.token && (
                <>
                  <Nav.Link
                    eventkey="my-lists"
                    as={Link}
                    to={`/UserList/${user.user.id}`}
                  >
                    My Lists
                  </Nav.Link>
                  <Nav.Link eventkey="logout" onClick={callLogOut}>
                    Log Out
                  </Nav.Link>
                </>
              )}
              {user.token === "" && (
                <Nav.Link eventKey="login" onClick={callLogin}>
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Text className="username">{user.user.username}</Navbar.Text>
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
