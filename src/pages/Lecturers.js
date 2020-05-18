import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import lecturer7 from "../assets/profile_images/lecturer7.jpg";
import lecturer2 from "../assets/profile_images/lecturer2.jpg";
import lecturer3 from "../assets/profile_images/lecturer3.jpg";
import { Link } from "react-router-dom";

export default function Lecturers() {
  return (
    <>
      <Container>
        <Row>
          <h1>All our awesome lecturers</h1>
        </Row>
        <Row md={4}>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={lecturer7} />
              <Card.Body>
                <Card.Title>Maya Mor</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Link to="/lecturerProfile/22">
                  <Button variant="primary">Go to lecturer</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={lecturer2} />
              <Card.Body>
                <Card.Title>Ben Shachar</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Link to="/lecturerProfile/2">
                  <Button variant="primary">Go to lecturer</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={lecturer3} />
              <Card.Body>
                <Card.Title>Roe Cohen</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Link to="/lecturerProfile/12">
                  <Button variant="primary">Go to lecturer</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
