import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = ({ token }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        LectureMe
      </Navbar.Brand>
      <Nav className="mr-auto">
        {token && (
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
            <Nav.Link as={Link} to="/signin">
              Logout
            </Nav.Link>
          </>
        )}
        {!token && (
          <>
            <Nav.Link as={Link} to="/signnin"></Nav.Link>
            <Nav.Link as={Link} to="/register"></Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

/*function Header(props) */

export default Header;
