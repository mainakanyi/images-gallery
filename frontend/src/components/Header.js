import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: '#eeeeee',
};

const Header = ({ title }) => {
  return (
    <Container>
      <Navbar style={navbarStyle} variant="light">
        {/* <Navbar.Brand href="/">{title}</Navbar.Brand> */}
        <Logo style={{ maxWidth: '12rem', maxHeight: '2rem' }} />
      </Navbar>
    </Container>
  );
};

export default Header;
