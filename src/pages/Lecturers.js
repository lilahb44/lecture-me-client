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
        <br></br>
        <Row>
          <h1 style={{ margin: "auto" }}>All our awesome lecturers</h1>
        </Row>
        <br></br>
        <Row md={4}>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={lecturer7} />
              <Card.Body>
                <Card.Title>Maya Mor</Card.Title>
                <Card.Text>
                  Dr. Maya Mor is the Director of the Center for European
                  Studies at the Interdisciplinary Center (IDC), Herzliya. She
                  received her Ph.D. in Political Science from the
                  Ludwig-Maximilian University of Munich in 2007.
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
                  Ben Shachar is a Professor of nutrition at Tel Aviv
                  University, Scientific Advisor to the Museum of Europe in
                  Brussels and Scientific Director to the Forum de Paris. Ben
                  Shachar wrote fifteen books about health.
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
                  Roe Cohen’s fields of study areinternational relations,
                  international economics, history and European studies. He aims
                  to spend the next few years on deepening his research within
                  the field of integration-theory.
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
