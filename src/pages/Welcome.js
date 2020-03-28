import React, { useState, useEffect } from "react";
import audience1 from "../assets/general/audience1.jpg";
import audience2 from "../assets/general/audience2.jpg";
import audience3 from "../assets/general/audience3.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Welcome({ token }) {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`https://lecture-me.herokuapp.com/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    })
      .then(response => response.json())
      .then(userData => setUser(userData));
  }, [token]);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <div class="row about text-center">
        <div class="col-12">
          <h1>Hi {user.firstName}!</h1>
        </div>
      </div>
      <Container fluid="md">
        <Row>
          <Col>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={audience3}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>“Easy web site to use” </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={audience2}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>“It was a very wonderful experience.”</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={audience1}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>“your service are excellent”</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
}
