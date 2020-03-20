import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = props => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        LectureMe
      </Navbar.Brand>
      <Nav className="mr-auto">
        {props.user && (
          <>
            <Nav.Link as={Link} to="/groups">
              Groups
            </Nav.Link>
            <Nav.Link as={Link} to="/surveys">
              Surveys
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
