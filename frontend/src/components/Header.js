import React from "react";
import { Navbar, Container } from "react-bootstrap";

const navbarStyle = {
  backgroundColor: "lightblue",
};

const Header = ({ title }) => {
  return (
    <Container>
      <Navbar style={navbarStyle} variant="light">
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Navbar>
    </Container>
  );
};

export default Header;
