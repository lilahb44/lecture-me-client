import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  flex-shrink: 0;
`;

const Header = ({ token, onUserLogedOut }) => {
  return (
    <StyledNavbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        LectureMe
      </Navbar.Brand>
      {token && (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/groups">
                Groups
              </Nav.Link>
              <Nav.Link as={Link} to="/surveys">
                Surveys
              </Nav.Link>
              <Nav.Link as={Link} to="/lecturers">
                Lecturers
              </Nav.Link>
              <Nav.Link as={Link} to="/orders">
                Orders
              </Nav.Link>
              <Nav.Link onClick={onUserLogedOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </StyledNavbar>
  );
};

export default Header;
