import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const defaultUser = {
  name: "",
  email: "",
  password: "",
  checkPassword: "",
  username: "",
};

const CreateUser = ({ sendNewUser }) => {
  const [newUser, setNewUser] = useState(defaultUser);
  const passwordRef = useRef(null);

  const validInput = () => {
    if (newUser.password !== newUser.checkPassword) {
      alert("Passwords aren't the same");
      passwordRef.current.focus();
      return false;
    }
    return true;
  };

  const submitInfo = () => {
    if (validInput()) {
      sendNewUser(newUser);
      setNewUser(defaultUser);
    }
  };

  const formOnChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setNewUser({
      ...newUser,
      [fieldName]: fieldValue,
    });
  };

  return (
    <main className="main">
      <Container>
        <Card>
          <Card.Header>Welcome to ReviewGram</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalName"
              >
                <Form.Label sm={2} column>
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={newUser.name}
                    onChange={formOnChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label sm={2} column>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={formOnChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalPassword"
              >
                <Form.Label sm={2} column>
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    ref={passwordRef}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={formOnChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalCheckPassword"
              >
                <Form.Label sm={2} column>
                  {" "}
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    placeholder="Type password again"
                    name="checkPassword"
                    value={newUser.checkPassword}
                    onChange={formOnChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalUserName"
              >
                <Form.Label sm={2} column>
                  User Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Your name in ReviewGram"
                    value={newUser.username}
                    onChange={formOnChange}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Button
              className="float-right"
              variant="primary"
              onClick={submitInfo}
            >
              Submit
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </main>
  );
};

export default CreateUser;
