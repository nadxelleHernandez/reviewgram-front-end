import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const defaultLoginInfo = { email: "", password: "" };

function Login({ doShow, handleLogin, handleClose }) {
  const [loginInfo, setLoginInfo] = useState(defaultLoginInfo);

  const formOnChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setLoginInfo({
      ...loginInfo,
      [fieldName]: fieldValue,
    });
  };

  const submitAuthentication = (event) => {
    handleLogin(loginInfo);
    setLoginInfo(defaultLoginInfo);
  };

  return (
    <Modal show={doShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Authentication required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={loginInfo.email}
              placeholder="Enter email"
              onChange={formOnChange}
              autoFocus
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={formOnChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitAuthentication}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
