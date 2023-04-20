import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Footer = () => {
  return (
    <>
      <Container fluid className="bg-dark text-white ft py-4">
        <Row xs={1} md={3} className="footer-text">
          <Col>
            <p>
              Welcome to 7Book. Sharing Books is made easy and fun with 7Book.
            </p>
          </Col>
          <Col>
            <p>
              Connect with your nearest Book lover and share your favourite
              books!
            </p>
          </Col>
          <Col>
            <ul className="list-unstyled">
              <li>
                <h5>Our Links</h5>
              </li>
              <LinkContainer to="/">
                <li className="links">Home</li>
              </LinkContainer>
              <a
                className="links"
                href="https://github.com/rharshit82"
                target="blank"
              >
                <li>Github</li>
              </a>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>Copyright &copy; 2021 7Book</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
