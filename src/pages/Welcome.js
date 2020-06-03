import React, { useState, useEffect } from "react";
import audience1 from "../assets/general/audience1.jpg";
import audience2 from "../assets/general/audience2.jpg";
import audience3 from "../assets/general/audience3.jpg";
import ProcessFlowChart from "../assets/general/ProcessFlowChart.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Welcome({ token }) {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`https://lecture-me.herokuapp.com/userApi/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((userData) => setUser(userData));
  }, [token]);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className="row about text-center">
          <div className="col-12">
            <h1>Hi {user.firstName}!</h1>
          </div>
          <div className="col-12">
            <img
              style={{ width: "60rem" }}
              className="d-block w-100"
              src={ProcessFlowChart}
              alt="ProcessFlowChart"
            />
          </div>
        </div>
      </Container>
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
