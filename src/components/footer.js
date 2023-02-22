import React from "react";
import "./footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import tmdbLogo from "./tmdbLogo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="p-3 mb-2 bg-secondary text-white">
        <Col sm={2}>Powered by:</Col>
        <Col sm={10} className="tmdb-logo">
          <a href="https://www.themoviedb.org">
            <img src={tmdbLogo} alt="The movie DB"></img>
          </a>
        </Col>
        <Col sm={3}>Created by: Soumya and Nad</Col>
      </Row>
    </footer>
  );
};

export default Footer;
